'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('../../constants.js');

function isAnimateParam(key) {
    return constants.ANIMATE_PARAMS.includes(key);
}

exports.isAnimateParam = isAnimateParam;
