import { EMPTY } from '@innet/jsx';
import { lcs } from '@innet/utils';
import { watchValueToValueWatcher } from '@watch-state/utils';
import innet, { useNewHandler, useHandler, extendHandler } from 'innet';
import { onDestroy, Watch, State, unwatch, createEvent } from 'watch-state';
import { FOR_WATCHER_KEY, FOR_VALUE, FOR_INDEX } from '../../constants.es6.js';
import '../../utils/index.es6.js';
import { Fragment } from '../../utils/views/Fragment/Fragment.es6.js';
import { setParent } from '../../utils/setParent/setParent.es6.js';
import { getParent } from '../../utils/getParent/getParent.es6.js';
import { after } from '../../utils/after/after.es6.js';
import { before } from '../../utils/before/before.es6.js';

function getForKey(data, key) {
    if (typeof key === 'string') {
        return data[key];
    }
    if (typeof key === 'function') {
        return key(data);
    }
    return data;
}
function For({ key, of: ofPropRaw, children, }) {
    if (!children || !ofPropRaw)
        return EMPTY;
    const ofProp = watchValueToValueWatcher(ofPropRaw);
    if (typeof ofProp !== 'function')
        return Array.from(ofProp).map((item, index) => children(item, index, getForKey(item, key)));
    const childHandler = useNewHandler();
    const forFragment = new Fragment();
    setParent(childHandler, forFragment);
    innet(forFragment, useHandler(), 0, true);
    let keysList = [];
    const handlersMap = new Map();
    onDestroy(() => {
        handlersMap.forEach(({ [FOR_WATCHER_KEY]: watcher }) => watcher.destroy());
    });
    new Watch(update => {
        const values = ofProp(update);
        if (!update) {
            let index = 0;
            for (const value of values) {
                const valueKey = getForKey(value, key);
                if (handlersMap.has(valueKey))
                    continue;
                keysList.push(valueKey);
                const fragment = new Fragment();
                const deepHandler = extendHandler(childHandler);
                setParent(deepHandler, fragment);
                forFragment.addChild(fragment);
                deepHandler[FOR_VALUE] = new State(value);
                deepHandler[FOR_INDEX] = new State(index++);
                handlersMap.set(valueKey, deepHandler);
                deepHandler[FOR_WATCHER_KEY] = new Watch(() => {
                    innet(children(deepHandler[FOR_VALUE], deepHandler[FOR_INDEX], valueKey), deepHandler);
                }, true);
            }
            return;
        }
        const oldKeysList = keysList;
        const oldKeysSet = new Set(oldKeysList);
        keysList = [];
        for (const value of values) {
            keysList.push(getForKey(value, key));
        }
        const keepKeys = new Set(lcs(oldKeysList, keysList));
        let i = 0;
        for (const value of values) {
            const index = i++;
            const valueKey = keysList[index];
            if (handlersMap.has(valueKey)) {
                const keep = keepKeys.has(valueKey);
                const deepHandler = handlersMap.get(valueKey);
                unwatch(createEvent(() => {
                    deepHandler[FOR_VALUE].value = value;
                    deepHandler[FOR_INDEX].value = index;
                }));
                if (!keep) {
                    const keyFragment = getParent(deepHandler);
                    if (index) {
                        after(getParent(handlersMap.get(keysList[index - 1])), keyFragment);
                    }
                    else if (oldKeysList.length) {
                        before(getParent(handlersMap.get(oldKeysList[0])), keyFragment);
                    }
                    else {
                        forFragment.insertChild(keyFragment, 0);
                    }
                }
            }
            else {
                const keyFragment = new Fragment();
                const keyHandler = Object.create(childHandler);
                setParent(keyHandler, keyFragment);
                keyHandler[FOR_VALUE] = new State(value);
                keyHandler[FOR_INDEX] = new State(index);
                handlersMap.set(valueKey, keyHandler);
                if (index) {
                    after(getParent(handlersMap.get(keysList[index - 1])), keyFragment);
                }
                else if (oldKeysList.length) {
                    before(getParent(handlersMap.get(oldKeysList[0])), keyFragment);
                }
                else {
                    forFragment.insertChild(keyFragment, 0);
                }
                keyHandler[FOR_WATCHER_KEY] = new Watch(() => {
                    innet(children(keyHandler[FOR_VALUE], keyHandler[FOR_INDEX], valueKey), keyHandler);
                }, true);
            }
            oldKeysSet.delete(valueKey);
        }
        oldKeysSet.forEach(valueKey => {
            const keyHandler = handlersMap.get(valueKey);
            handlersMap.delete(valueKey);
            forFragment.removeChild(getParent(keyHandler));
            keyHandler[FOR_WATCHER_KEY].destroy();
        });
    });
    return EMPTY;
}

export { For, getForKey };
