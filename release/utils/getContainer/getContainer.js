'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@innet/utils');
var core = require('@nativescript/core');
var watchState = require('watch-state');
require('../Fragment/index.js');
require('../getParent/index.js');
require('../setParent/index.js');
var Fragment = require('../Fragment/Fragment.js');
var setParent = require('../setParent/setParent.js');
var getParent = require('../getParent/getParent.js');

function getContainer(handler, freeParent = false, parent = getParent.getParent(handler)) {
    const container = new Fragment.Fragment();
    const childHandler = Object.create(handler);
    setParent.setParent(childHandler, container);
    if (parent instanceof utils.Ref) {
        parent.value = container;
        return [childHandler, container];
    }
    if (parent instanceof core.LayoutBase) {
        parent.addChild(container);
        if (!freeParent) {
            watchState.onDestroy(() => { parent.removeChild(container); });
        }
        return [childHandler, container];
    }
    throw Error(`You cannot get content, parent is ${parent === null || parent === void 0 ? void 0 : parent.typeName}`);
}

exports.getContainer = getContainer;
