'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var elements = require('../../elements.js');

function createView(tagName) {
    return new elements.JSX_ELEMENTS[tagName]();
}

exports.createView = createView;
