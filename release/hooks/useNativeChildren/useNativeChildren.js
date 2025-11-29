'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var core = require('@nativescript/core');
var innet = require('innet');
var constants = require('../../constants.js');
require('../../utils/index.js');
var setParent = require('../../utils/setParent/setParent.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function useNativeChildren(target) {
    const children = jsx.useChildren();
    if (!children)
        return;
    const childrenHandler = innet.useNewHandler();
    setParent.setParent(childrenHandler, target);
    if (target instanceof core.Frame) {
        childrenHandler[constants.PARENT_FRAME] = target;
    }
    innet__default["default"](children, childrenHandler, 0, true);
}

exports.useNativeChildren = useNativeChildren;
