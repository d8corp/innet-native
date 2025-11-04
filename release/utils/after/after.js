'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@nativescript/core');

function after(target, view) {
    const parent = target.parent;
    if (parent instanceof core.LayoutBase) {
        parent.insertChild(view, parent.getChildIndex(target) + 1);
    }
    else {
        console.error('target element is not inside LayoutBase.');
    }
}

exports.after = after;
