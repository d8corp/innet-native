'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@watch-state/utils');

function Hide({ when, children, fallback }) {
    return utils.inject(when, state => state ? fallback : children);
}

exports.Hide = Hide;
