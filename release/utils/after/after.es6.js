import { LayoutBase } from '@nativescript/core';

function after(target, view) {
    const parent = target.parent;
    if (parent instanceof LayoutBase) {
        parent.insertChild(view, parent.getChildIndex(target) + 1);
    }
    else {
        console.error('target element is not inside LayoutBase.');
    }
}

export { after };
