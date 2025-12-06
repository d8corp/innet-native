'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@nativescript/core');
var utils = require('@watch-state/utils');
var innet = require('innet');
var constants = require('../../constants.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function native(handler) {
    const prevHook = handler[innet.HOOK];
    handler[innet.HOOK] = () => utils.withScope(prevHook());
    const nativePlugin = () => {
        const app = innet.useApp();
        const handler = innet.useNewHandler();
        const children = handler[constants.PARENT] = [];
        handler[innet.PLUGINS] = handler[innet.PLUGINS].filter((plugin) => plugin !== nativePlugin);
        Promise.resolve().then(() => {
            core.Application.run({
                create: () => {
                    innet__default["default"](app, handler);
                    if (!children.length) {
                        throw Error('No content provided as a root element');
                    }
                    if (children.length > 1) {
                        throw Error('Many content provided as a root element');
                    }
                    const view = children[0];
                    if (!(view instanceof core.View)) {
                        throw Error(`Unknown view ${String(view)} used as root`);
                    }
                    return view;
                },
            });
        });
    };
    return nativePlugin;
}

exports.native = native;
