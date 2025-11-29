import { Label, TextBase, FormattedString, Span, LayoutBase } from '@nativescript/core';
import innet, { useApp, useHandler } from 'innet';
import '../../hooks/index.es6.js';
import { useParent } from '../../hooks/useParent/useParent.es6.js';

function nativeText() {
    return () => {
        var _a;
        const app = useApp();
        const parent = useParent();
        const handler = useHandler();
        if (typeof parent === 'function') {
            const label = new Label();
            label.text = app;
            innet(label, handler, 0, true);
            return;
        }
        if (parent instanceof TextBase) {
            parent.text = `${(_a = parent.text) !== null && _a !== void 0 ? _a : ''}${app}`;
            return;
        }
        if (parent instanceof FormattedString) {
            const span = new Span();
            span.text = app;
            innet(span, handler, 0, true);
            return;
        }
        if (parent instanceof LayoutBase) {
            const label = new Label();
            label.text = app;
            innet(label, handler, 0, true);
            return;
        }
        throw Error(`You cannot place a text into ${String(parent)}`);
    };
}

export { nativeText };
