'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('../../constants.js');

function getViewEndingAnimate(view) {
    // @ts-expect-error Hack for ending animations
    return view[constants.ENDING_ANIMATE];
}

exports.getViewEndingAnimate = getViewEndingAnimate;
