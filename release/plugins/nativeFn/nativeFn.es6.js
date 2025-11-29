import { withScope } from '@watch-state/utils';
import innet, { useApp, useHandler } from 'innet';
import { queueNanotask } from 'queue-nano-task';
import { Watch } from 'watch-state';
import '../../hooks/index.es6.js';
import '../../utils/index.es6.js';
import { useChildrenFragment } from '../../hooks/useChildrenFragment/useChildrenFragment.es6.js';
import { getChildren } from '../../utils/getChildren/getChildren.es6.js';
import { updateChildren } from '../../utils/updateChildren/updateChildren.es6.js';

function nativeFn() {
    return () => {
        const fn = useApp();
        const [childrenHandler, fragment] = useChildrenFragment();
        const fragmentChildren = getChildren(fragment);
        innet(fragment, useHandler(), 0, true);
        new Watch(update => {
            const children = fn(update);
            queueNanotask(withScope(() => {
                if (update) {
                    fragmentChildren.length = 0;
                    queueNanotask(() => {
                        updateChildren(fragment, true);
                    }, 1, true);
                }
                innet(children, childrenHandler, 0, true);
            }), 0, true);
        });
    };
}

export { nativeFn };
