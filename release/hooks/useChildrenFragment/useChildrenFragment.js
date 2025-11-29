'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@nativescript/core');
var innet = require('innet');
require('../../utils/index.js');
var setParent = require('../../utils/setParent/setParent.js');

function useChildrenFragment() {
    const fragment = new core.ProxyViewContainer();
    const childrenHandler = innet.useNewHandler();
    setParent.setParent(childrenHandler, fragment);
    return [childrenHandler, fragment];
}

exports.useChildrenFragment = useChildrenFragment;
