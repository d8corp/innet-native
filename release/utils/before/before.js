'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@nativescript/core');

function before(target, view) {
    const parent = target.parent;
    if (parent instanceof core.LayoutBase) {
        parent.insertChild(view, Math.max(parent.getChildIndex(target) - 1, 0));
    }
    else {
        console.error('target element is not inside LayoutBase.');
    }
}

exports.before = before;
