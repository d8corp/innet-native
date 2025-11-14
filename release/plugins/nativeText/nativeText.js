'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@nativescript/core');
var innet = require('innet');
require('../../hooks/index.js');
var useParent = require('../../hooks/useParent/useParent.js');

function nativeText() {
    return () => {
        var _a;
        const app = innet.useApp();
        const parent = useParent.useParent();
        if (typeof parent === 'function') {
            const label = new core.Label();
            label.text = app;
            parent(label);
            return;
        }
        if (parent instanceof core.TextBase) {
            parent.text = `${(_a = parent.text) !== null && _a !== void 0 ? _a : ''}${app}`;
            return;
        }
        if (parent instanceof core.FormattedString) {
            const span = new core.Span();
            span.text = app;
            parent.spans.push(span);
            return;
        }
        if (parent instanceof core.LayoutBase) {
            const label = new core.Label();
            label.text = app;
            parent.addChild(label);
            return;
        }
        throw Error(`You cannot place a text into ${String(parent)}`);
    };
}

exports.nativeText = nativeText;
