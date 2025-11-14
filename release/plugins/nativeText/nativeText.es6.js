import { Label, TextBase, FormattedString, Span, LayoutBase } from '@nativescript/core';
import { useApp } from 'innet';
import '../../hooks/index.es6.js';
import { useParent } from '../../hooks/useParent/useParent.es6.js';

function nativeText() {
    return () => {
        var _a;
        const app = useApp();
        const parent = useParent();
        if (typeof parent === 'function') {
            const label = new Label();
            label.text = app;
            parent(label);
            return;
        }
        if (parent instanceof TextBase) {
            parent.text = `${(_a = parent.text) !== null && _a !== void 0 ? _a : ''}${app}`;
            return;
        }
        if (parent instanceof FormattedString) {
            const span = new Span();
            span.text = app;
            parent.spans.push(span);
            return;
        }
        if (parent instanceof LayoutBase) {
            const label = new Label();
            label.text = app;
            parent.addChild(label);
            return;
        }
        throw Error(`You cannot place a text into ${String(parent)}`);
    };
}

export { nativeText };
