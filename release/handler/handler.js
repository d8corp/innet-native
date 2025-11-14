'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var utils = require('@innet/utils');
var core = require('@nativescript/core');
var innet = require('innet');
require('../plugins/index.js');
require('../utils/index.js');
var state = require('../plugins/state/state.js');
var nativeIterable = require('../plugins/nativeIterable/nativeIterable.js');
var nativeJSX = require('../plugins/nativeJSX/nativeJSX.js');
var nativeFn = require('../plugins/nativeFn/nativeFn.js');
var nativeText = require('../plugins/nativeText/nativeText.js');
var nativeNode = require('../plugins/nativeNode/nativeNode.js');
var nativeAsync = require('../plugins/nativeAsync/nativeAsync.js');
var view = require('../plugins/view/view.js');
var setParent = require('../utils/setParent/setParent.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

const arrayPlugins = [
    utils.arraySync,
];
const JSXPlugins = {};
const objectPlugins = [
    state.state,
    nativeIterable.nativeIterable,
    nativeJSX.nativeJSX,
    jsx.jsxComponent,
    jsx.jsxPlugins(JSXPlugins),
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
    nativeAsync.nativeAsync,
];
const handlerInner = innet.createHandler([
    utils.nullish([]),
    utils.promise(promisePlugins),
    view.view(nodePlugins),
    utils.fn(fnPlugins),
    utils.string(stringPlugins),
    utils.number(numberPlugins),
    utils.array(arrayPlugins),
    utils.object(objectPlugins),
]);
const handler = innet.createHandler([
    () => () => {
        const app = innet.useApp();
        const handler = Object.create(handlerInner);
        setParent.setParent(handler, (view) => {
            if (!(view instanceof core.View)) {
                throw Error(`Unknown view ${String(view)} used as root`);
            }
            innet__default["default"](() => {
                core.Application.run({ create: () => view });
            }, utils.callHandler, 3);
        });
        innet__default["default"](app, handler);
    },
]);

exports.JSXPlugins = JSXPlugins;
exports.arrayPlugins = arrayPlugins;
exports.fnPlugins = fnPlugins;
exports.handler = handler;
exports.nodePlugins = nodePlugins;
exports.numberPlugins = numberPlugins;
exports.objectPlugins = objectPlugins;
exports.promisePlugins = promisePlugins;
exports.stringPlugins = stringPlugins;
