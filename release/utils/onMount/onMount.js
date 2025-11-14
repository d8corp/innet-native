'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@innet/utils');
var innet = require('innet');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function onMount(callback) {
    innet__default["default"](callback, utils.callHandler, 3);
}

exports.onMount = onMount;
