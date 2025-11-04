import { TextBase, Span, FormattedString, LayoutBase, Label } from '@nativescript/core';
import { useApp } from 'innet';
import { onDestroy } from 'watch-state';
import '../../hooks/index.es6.js';
import { useParent } from '../../hooks/useParent/useParent.es6.js';

function nativeText() {
    return () => {
        var _a;
        const app = useApp();
        const parent = useParent();
        if (parent instanceof TextBase || parent instanceof Span) {
            parent.text = `${(_a = parent.text) !== null && _a !== void 0 ? _a : ''}${app}`;
        }
        else if (parent instanceof FormattedString) {
            const span = new Span();
            span.text = app;
            parent.spans.push(span);
            onDestroy(() => {
                span.destroyNode();
            });
        }
        else if (parent instanceof LayoutBase) {
            const label = new Label();
            label.text = app;
            parent.addChild(label);
            onDestroy(() => {
                parent.removeChild(label);
                label.destroyNode();
            });
        }
    };
}

export { nativeText };
