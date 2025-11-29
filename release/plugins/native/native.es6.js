import { View, Application } from '@nativescript/core';
import { withScope } from '@watch-state/utils';
import innet, { HOOK, useApp, useNewHandler, PLUGINS } from 'innet';
import { queueNanotask } from 'queue-nano-task';
import { PARENT } from '../../constants.es6.js';

function native(handler) {
    const prevHook = handler[HOOK];
    handler[HOOK] = () => withScope(prevHook());
    const nativePlugin = () => {
        const app = useApp();
        const handler = useNewHandler();
        const children = handler[PARENT] = [];
        handler[PLUGINS] = handler[PLUGINS].filter((plugin) => plugin !== nativePlugin);
        innet(app, handler);
        queueNanotask(() => {
            if (!children.length) {
                throw Error('No content provided as a root element');
            }
            if (children.length > 1) {
                throw Error('Many content provided as a root element');
            }
            const view = children[0];
            if (!(view instanceof View)) {
                throw Error(`Unknown view ${String(view)} used as root`);
            }
            Application.run({ create: () => view });
        }, 1);
    };
    return nativePlugin;
}

export { native };
