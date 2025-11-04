'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@nativescript/core');
var innet = require('innet');
var watchState = require('watch-state');
require('../../hooks/index.js');
var useParent = require('../../hooks/useParent/useParent.js');

function nativeText() {
    return () => {
        var _a;
        const app = innet.useApp();
        const parent = useParent.useParent();
        if (parent instanceof core.TextBase || parent instanceof core.Span) {
            parent.text = `${(_a = parent.text) !== null && _a !== void 0 ? _a : ''}${app}`;
        }
        else if (parent instanceof core.FormattedString) {
            const span = new core.Span();
            span.text = app;
            parent.spans.push(span);
            watchState.onDestroy(() => {
                span.destroyNode();
            });
        }
        else if (parent instanceof core.LayoutBase) {
            const label = new core.Label();
            label.text = app;
            parent.addChild(label);
            watchState.onDestroy(() => {
                parent.removeChild(label);
                label.destroyNode();
            });
        }
    };
}

exports.nativeText = nativeText;
