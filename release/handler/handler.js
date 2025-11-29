'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var utils = require('@innet/utils');
var innet = require('innet');
require('../plugins/index.js');
var state = require('../plugins/state/state.js');
var nativeIterable = require('../plugins/nativeIterable/nativeIterable.js');
var nativeJSX = require('../plugins/nativeJSX/nativeJSX.js');
var nativeFn = require('../plugins/nativeFn/nativeFn.js');
var nativeText = require('../plugins/nativeText/nativeText.js');
var nativeNode = require('../plugins/nativeNode/nativeNode.js');
var suspense = require('../plugins/suspense/suspense.js');
var nativeAsync = require('../plugins/nativeAsync/nativeAsync.js');
var native = require('../plugins/native/native.js');
var view = require('../plugins/view/view.js');

const arrayPlugins = [
    utils.arraySync,
];
const objectPlugins = [
    state.state,
    nativeIterable.nativeIterable,
    nativeJSX.nativeJSX,
    jsx.jsxComponent,
];
const fnPlugins = [
    nativeFn.nativeFn,
];
const stringPlugins = [
    nativeText.nativeText,
];
const numberPlugins = [
    nativeText.nativeText,
];
const nodePlugins = [
    nativeNode.nativeNode,
];
const promisePlugins = [
    suspense.suspense,
    nativeAsync.nativeAsync,
];
const handler = innet.createHandler([
    native.native,
    utils.nullish([]),
    utils.promise(promisePlugins),
    view.view(nodePlugins),
    utils.fn(fnPlugins),
    utils.string(stringPlugins),
    utils.number(numberPlugins),
    utils.array(arrayPlugins),
    utils.object(objectPlugins),
]);

exports.arrayPlugins = arrayPlugins;
exports.fnPlugins = fnPlugins;
exports.handler = handler;
exports.nodePlugins = nodePlugins;
exports.numberPlugins = numberPlugins;
exports.objectPlugins = objectPlugins;
exports.promisePlugins = promisePlugins;
exports.stringPlugins = stringPlugins;
