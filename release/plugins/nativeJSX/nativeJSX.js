'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@nativescript/core');
var innet = require('innet');
var watchState = require('watch-state');
require('../../hooks/index.js');
var useNativeProps = require('../../hooks/useNativeProps/useNativeProps.js');
var useNativeChildren = require('../../hooks/useNativeChildren/useNativeChildren.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function nativeJSX() {
    return () => {
        const { type: Type } = innet.useApp();
        if (!((Type === null || Type === void 0 ? void 0 : Type.prototype) instanceof core.ViewBase))
            return innet.NEXT;
        const handler = innet.useHandler();
        const target = new Type();
        if (target instanceof core.Page) {
            const watcher = new watchState.Watch(() => {
                useNativeProps.useNativeProps(target);
                useNativeChildren.useNativeChildren(target);
            }, true);
            target.once('disposeNativeView', () => {
                watcher.destroy();
            });
        }
        else {
            useNativeProps.useNativeProps(target);
            useNativeChildren.useNativeChildren(target);
        }
        innet__default["default"](target, handler, 0, true);
    };
}

exports.nativeJSX = nativeJSX;
