'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@watch-state/utils');

function Show({ when, children, fallback }) {
    return utils.inject(when, state => state ? children : fallback);
}

exports.Show = Show;
