import { ViewBase } from '@nativescript/core';
import innet, { useApp, NEXT, useHandler } from 'innet';
import { JSX_ELEMENTS } from '../../elements.es6.js';
import '../../hooks/index.es6.js';
import '../../utils/index.es6.js';
import { createView } from '../../utils/createView/createView.es6.js';
import { useNativeProps } from '../../hooks/useNativeProps/useNativeProps.es6.js';
import { useNativeChildren } from '../../hooks/useNativeChildren/useNativeChildren.es6.js';

function nativeJSX() {
    return () => {
        const { type: Type } = useApp();
        if ((typeof Type !== 'string' || !(Type in JSX_ELEMENTS)) && !((Type === null || Type === void 0 ? void 0 : Type.prototype) instanceof ViewBase))
            return NEXT;
        const handler = useHandler();
        const target = typeof Type === 'string' ? createView(Type) : new Type();
        useNativeProps(target, typeof Type === 'string' ? Type : undefined);
        useNativeChildren(target);
        innet(target, handler, 0, true);
    };
}

export { nativeJSX };
