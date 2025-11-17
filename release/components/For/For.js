'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var utils$1 = require('@innet/utils');
var utils = require('@watch-state/utils');
var innet = require('innet');
var watchState = require('watch-state');
var constants = require('../../constants.js');
require('../../utils/index.js');
var Fragment = require('../../utils/views/Fragment/Fragment.js');
var setParent = require('../../utils/setParent/setParent.js');
var getParent = require('../../utils/getParent/getParent.js');
var after = require('../../utils/after/after.js');
var before = require('../../utils/before/before.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

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
        return jsx.EMPTY;
    const ofProp = utils.watchValueToValueWatcher(ofPropRaw);
    if (typeof ofProp !== 'function')
        return Array.from(ofProp).map((item, index) => children(item, index, getForKey(item, key)));
    const childHandler = innet.useNewHandler();
    const forFragment = new Fragment.Fragment();
    setParent.setParent(childHandler, forFragment);
    innet__default["default"](forFragment, innet.useHandler(), 1, true);
    let keysList = [];
    const handlersMap = new Map();
    watchState.onDestroy(() => {
        handlersMap.forEach(({ [constants.FOR_WATCHER_KEY]: watcher }) => watcher.destroy());
    });
    new watchState.Watch(update => {
        const values = ofProp(update);
        if (!update) {
            let index = 0;
            for (const value of values) {
                const valueKey = getForKey(value, key);
                if (handlersMap.has(valueKey))
                    continue;
                keysList.push(valueKey);
                const fragment = new Fragment.Fragment();
                const deepHandler = innet.extendHandler(childHandler);
                setParent.setParent(deepHandler, fragment);
                forFragment.addChild(fragment);
                deepHandler[constants.FOR_VALUE] = new watchState.State(value);
                deepHandler[constants.FOR_INDEX] = new watchState.State(index++);
                handlersMap.set(valueKey, deepHandler);
                deepHandler[constants.FOR_WATCHER_KEY] = new watchState.Watch(() => {
                    innet__default["default"](children(deepHandler[constants.FOR_VALUE], deepHandler[constants.FOR_INDEX], valueKey), deepHandler);
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
        const keepKeys = new Set(utils$1.lcs(oldKeysList, keysList));
        let i = 0;
        for (const value of values) {
            const index = i++;
            const valueKey = keysList[index];
            if (handlersMap.has(valueKey)) {
                const keep = keepKeys.has(valueKey);
                const deepHandler = handlersMap.get(valueKey);
                watchState.unwatch(watchState.createEvent(() => {
                    deepHandler[constants.FOR_VALUE].value = value;
                    deepHandler[constants.FOR_INDEX].value = index;
                }));
                if (!keep) {
                    const keyFragment = getParent.getParent(deepHandler);
                    if (index) {
                        after.after(getParent.getParent(handlersMap.get(keysList[index - 1])), keyFragment);
                    }
                    else if (oldKeysList.length) {
                        before.before(getParent.getParent(handlersMap.get(oldKeysList[0])), keyFragment);
                    }
                    else {
                        forFragment.insertChild(keyFragment, 0);
                    }
                }
            }
            else {
                const keyFragment = new Fragment.Fragment();
                const keyHandler = Object.create(childHandler);
                setParent.setParent(keyHandler, keyFragment);
                keyHandler[constants.FOR_VALUE] = new watchState.State(value);
                keyHandler[constants.FOR_INDEX] = new watchState.State(index);
                handlersMap.set(valueKey, keyHandler);
                if (index) {
                    after.after(getParent.getParent(handlersMap.get(keysList[index - 1])), keyFragment);
                }
                else if (oldKeysList.length) {
                    before.before(getParent.getParent(handlersMap.get(oldKeysList[0])), keyFragment);
                }
                else {
                    forFragment.insertChild(keyFragment, 0);
                }
                keyHandler[constants.FOR_WATCHER_KEY] = new watchState.Watch(() => {
                    innet__default["default"](children(keyHandler[constants.FOR_VALUE], keyHandler[constants.FOR_INDEX], valueKey), keyHandler);
                }, true);
            }
            oldKeysSet.delete(valueKey);
        }
        oldKeysSet.forEach(valueKey => {
            const keyHandler = handlersMap.get(valueKey);
            handlersMap.delete(valueKey);
            forFragment.removeChild(getParent.getParent(keyHandler));
            keyHandler[constants.FOR_WATCHER_KEY].destroy();
        });
    });
    return jsx.EMPTY;
}

exports.For = For;
exports.getForKey = getForKey;
