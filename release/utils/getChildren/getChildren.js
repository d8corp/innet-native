'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('../../constants.js');

function getChildren(target) {
    if (Array.isArray(target)) {
        return target;
    }
    if (!target[constants.CHILDREN]) {
        target[constants.CHILDREN] = [];
    }
    return target[constants.CHILDREN];
}

exports.getChildren = getChildren;
