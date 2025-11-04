'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
require('../../utils/index.js');
var setParent = require('../../utils/setParent/setParent.js');

function useChildrenHandler(view) {
    const handler = Object.create(innet.useHandler());
    setParent.setParent(handler, view);
    return handler;
}

exports.useChildrenHandler = useChildrenHandler;
