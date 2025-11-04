import { __classPrivateFieldGet, __classPrivateFieldSet } from 'tslib';
import { ProxyViewContainer } from '@nativescript/core';

var _Fragment_shown, _Fragment_shadow;
class Fragment extends ProxyViewContainer {
    constructor() {
        super(...arguments);
        _Fragment_shown.set(this, true);
        _Fragment_shadow.set(this, []);
    }
    get shown() {
        return __classPrivateFieldGet(this, _Fragment_shown, "f");
    }
    set shown(shown) {
        if (shown === __classPrivateFieldGet(this, _Fragment_shown, "f"))
            return;
        if (shown) {
            __classPrivateFieldGet(this, _Fragment_shadow, "f").forEach(view => {
                super.addChild(view);
            });
        }
        else {
            __classPrivateFieldGet(this, _Fragment_shadow, "f").forEach(view => {
                super.removeChild(view);
            });
        }
        __classPrivateFieldSet(this, _Fragment_shown, shown, "f");
    }
    getChildrenCount() {
        return __classPrivateFieldGet(this, _Fragment_shadow, "f").length;
    }
    getChildAt(index) {
        return __classPrivateFieldGet(this, _Fragment_shadow, "f")[index];
    }
    getChildIndex(view) {
        return __classPrivateFieldGet(this, _Fragment_shadow, "f").indexOf(view);
    }
    addChild(view) {
        __classPrivateFieldGet(this, _Fragment_shadow, "f").push(view);
        if (__classPrivateFieldGet(this, _Fragment_shown, "f")) {
            super.addChild(view);
        }
    }
    insertChild(child, atIndex) {
        __classPrivateFieldGet(this, _Fragment_shadow, "f").splice(atIndex, 0, child);
        if (__classPrivateFieldGet(this, _Fragment_shown, "f")) {
            return super.insertChild(child, atIndex);
        }
        return true;
    }
    removeChild(view) {
        __classPrivateFieldSet(this, _Fragment_shadow, __classPrivateFieldGet(this, _Fragment_shadow, "f").filter(item => item !== view), "f");
        if (__classPrivateFieldGet(this, _Fragment_shown, "f")) {
            super.removeChild(view);
        }
    }
    removeChildren() {
        __classPrivateFieldSet(this, _Fragment_shadow, [], "f");
        if (__classPrivateFieldGet(this, _Fragment_shown, "f")) {
            super.removeChildren();
        }
    }
}
_Fragment_shown = new WeakMap(), _Fragment_shadow = new WeakMap();

export { Fragment };
