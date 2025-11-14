'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('../../constants.js');

function setViewEndingAnimate(view, animate) {
    // @ts-expect-error Hack for ending animations
    view[constants.ENDING_ANIMATE] = animate;
}

exports.setViewEndingAnimate = setViewEndingAnimate;
