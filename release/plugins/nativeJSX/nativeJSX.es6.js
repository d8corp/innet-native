import { ViewBase, Page } from '@nativescript/core';
import innet, { useApp, NEXT, useHandler } from 'innet';
import { Watch } from 'watch-state';
import '../../hooks/index.es6.js';
import { useNativeProps } from '../../hooks/useNativeProps/useNativeProps.es6.js';
import { useNativeChildren } from '../../hooks/useNativeChildren/useNativeChildren.es6.js';

function nativeJSX() {
    return () => {
        const { type: Type } = useApp();
        if (!((Type === null || Type === void 0 ? void 0 : Type.prototype) instanceof ViewBase))
            return NEXT;
        const handler = useHandler();
        const target = new Type();
        if (target instanceof Page) {
            const watcher = new Watch(() => {
                useNativeProps(target);
                useNativeChildren(target);
            }, true);
            target.once('disposeNativeView', () => {
                watcher.destroy();
            });
        }
        else {
            useNativeProps(target);
            useNativeChildren(target);
        }
        innet(target, handler, 0, true);
    };
}

export { nativeJSX };
