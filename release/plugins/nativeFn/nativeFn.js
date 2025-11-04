'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@nativescript/core');
var innet = require('innet');
var watchState = require('watch-state');
require('../../hooks/index.js');
var useParent = require('../../hooks/useParent/useParent.js');
var useView = require('../../hooks/useView/useView.js');
var useChildrenHandler = require('../../hooks/useChildrenHandler/useChildrenHandler.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function nativeFn() {
    return () => {
        const fn = innet.useApp();
        const parent = useParent.useParent();
        if (parent instanceof core.Span) {
            new watchState.Watch((update) => {
                parent.text = String(fn(update));
            });
            return;
        }
        const fragment = useView.useView('fragment');
        const childrenHandler = useChildrenHandler.useChildrenHandler(fragment);
        innet__default["default"](fragment, innet.useHandler());
        new watchState.Watch(update => {
            if (update) {
                fragment.removeChildren();
            }
            innet__default["default"](fn(update), childrenHandler);
        });
    };
}

exports.nativeFn = nativeFn;
