'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var jsx = require('@innet/jsx');
var innet = require('innet');
var constants = require('../../constants.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function Navigate(props) {
    const handler = innet.useHandler();
    if ('create' in props || 'moduleName' in props) {
        const frame = handler[constants.PARENT_FRAME];
        if (!frame) {
            throw Error('You can place <Navigate /> only in a <frame>');
        }
        frame.navigate(props);
    }
    else {
        const childHandler = Object.create(handler);
        const _a = props, { children } = _a, rest = tslib.__rest(_a, ["children"]);
        handler[constants.PARENT_NAVIGATE] = rest;
        innet__default["default"](children, childHandler);
    }
    return jsx.EMPTY;
}

exports.Navigate = Navigate;
