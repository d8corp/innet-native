'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@nativescript/core');
var innet = require('innet');
require('../../hooks/index.js');
var useParent = require('../../hooks/useParent/useParent.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function nativeText() {
    return () => {
        var _a;
        const app = innet.useApp();
        const parent = useParent.useParent();
        const handler = innet.useHandler();
        if (typeof parent === 'function') {
            const label = new core.Label();
            label.text = app;
            innet__default["default"](label, handler, 0, true);
            return;
        }
        if (parent instanceof core.TextBase) {
            parent.text = `${(_a = parent.text) !== null && _a !== void 0 ? _a : ''}${app}`;
            return;
        }
        if (parent instanceof core.FormattedString) {
            const span = new core.Span();
            span.text = app;
            innet__default["default"](span, handler, 0, true);
            return;
        }
        if (parent instanceof core.LayoutBase) {
            const label = new core.Label();
            label.text = app;
            innet__default["default"](label, handler, 0, true);
            return;
        }
        throw Error(`You cannot place a text into ${String(parent)}`);
    };
}

exports.nativeText = nativeText;
