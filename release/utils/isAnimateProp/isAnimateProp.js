'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('../../constants.js');

function isAnimateProp(key) {
    return constants.ANIMATE_PROPS.includes(key);
}

exports.isAnimateProp = isAnimateProp;
