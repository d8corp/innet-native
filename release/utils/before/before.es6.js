import { LayoutBase } from '@nativescript/core';

function before(target, view) {
    const parent = target.parent;
    if (parent instanceof LayoutBase) {
        parent.insertChild(view, Math.max(parent.getChildIndex(target) - 1, 0));
    }
    else {
        console.error('target element is not inside LayoutBase.');
    }
}

export { before };
