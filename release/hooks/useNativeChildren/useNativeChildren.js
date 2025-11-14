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
    if (children) {
        const handler = innet.useHandler();
        const childrenHandler = Object.create(handler);
        if (target instanceof core.Frame) {
            childrenHandler[constants.PARENT_FRAME] = target;
        }
        setParent.setParent(childrenHandler, target);
        innet__default["default"](children, childrenHandler);
    }
}

exports.useNativeChildren = useNativeChildren;
