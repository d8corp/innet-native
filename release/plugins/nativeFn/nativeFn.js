'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
var watchState = require('watch-state');
require('../../hooks/index.js');
require('../../utils/index.js');
var Fragment = require('../../utils/views/Fragment/Fragment.js');
var useChildrenHandler = require('../../hooks/useChildrenHandler/useChildrenHandler.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function nativeFn() {
    return () => {
        const fn = innet.useApp();
        const fragment = new Fragment.Fragment();
        const childrenHandler = useChildrenHandler.useChildrenHandler(fragment);
        innet__default["default"](fragment, innet.useHandler(), 2);
        new watchState.Watch(update => {
            if (update) {
                fragment.removeChildren();
            }
            innet__default["default"](fn(update), childrenHandler);
        });
    };
}

exports.nativeFn = nativeFn;
