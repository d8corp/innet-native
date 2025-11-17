'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@nativescript/core');
var innet = require('innet');
var elements = require('../../elements.js');
require('../../hooks/index.js');
require('../../utils/index.js');
var createView = require('../../utils/createView/createView.js');
var useNativeProps = require('../../hooks/useNativeProps/useNativeProps.js');
var useNativeChildren = require('../../hooks/useNativeChildren/useNativeChildren.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function nativeJSX() {
    return () => {
        const { type: Type } = innet.useApp();
        if ((typeof Type !== 'string' || !(Type in elements.JSX_ELEMENTS)) && !((Type === null || Type === void 0 ? void 0 : Type.prototype) instanceof core.ViewBase))
            return innet.NEXT;
        const handler = innet.useHandler();
        const target = typeof Type === 'string' ? createView.createView(Type) : new Type();
        useNativeProps.useNativeProps(target, typeof Type === 'string' ? Type : undefined);
        useNativeChildren.useNativeChildren(target);
        innet__default["default"](target, handler, 1, true);
    };
}

exports.nativeJSX = nativeJSX;
