'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var core = require('@nativescript/core');
require('../../getViewEndingAnimate/index.js');
var getViewEndingAnimate = require('../../getViewEndingAnimate/getViewEndingAnimate.js');

var _Fragment_shown, _Fragment_shadow;
/** @deprecated Temporary solution */
class Fragment extends core.ProxyViewContainer {
    constructor() {
        super(...arguments);
        _Fragment_shown.set(this, true);
        _Fragment_shadow.set(this, []);
    }
    get shown() {
        return tslib.__classPrivateFieldGet(this, _Fragment_shown, "f");
    }
    set shown(shown) {
        if (shown === tslib.__classPrivateFieldGet(this, _Fragment_shown, "f"))
            return;
        if (shown) {
            tslib.__classPrivateFieldGet(this, _Fragment_shadow, "f").forEach(view => {
                super.addChild(view);
            });
        }
        else {
            tslib.__classPrivateFieldGet(this, _Fragment_shadow, "f").forEach(view => {
                super.removeChild(view);
            });
        }
        tslib.__classPrivateFieldSet(this, _Fragment_shown, shown, "f");
    }
    getChildrenCount() {
        return tslib.__classPrivateFieldGet(this, _Fragment_shadow, "f").length;
    }
    getChildAt(index) {
        return tslib.__classPrivateFieldGet(this, _Fragment_shadow, "f")[index];
    }
    getChildIndex(view) {
        return tslib.__classPrivateFieldGet(this, _Fragment_shadow, "f").indexOf(view);
    }
    addChild(view) {
        tslib.__classPrivateFieldGet(this, _Fragment_shadow, "f").push(view);
        if (tslib.__classPrivateFieldGet(this, _Fragment_shown, "f")) {
            super.addChild(view);
        }
    }
    insertChild(child, atIndex) {
        tslib.__classPrivateFieldGet(this, _Fragment_shadow, "f").splice(atIndex, 0, child);
        if (tslib.__classPrivateFieldGet(this, _Fragment_shown, "f")) {
            return super.insertChild(child, atIndex);
        }
        return true;
    }
    removeChild(view) {
        tslib.__classPrivateFieldSet(this, _Fragment_shadow, tslib.__classPrivateFieldGet(this, _Fragment_shadow, "f").filter(item => item !== view), "f");
        if (tslib.__classPrivateFieldGet(this, _Fragment_shown, "f")) {
            super.removeChild(view);
        }
    }
    removeChildren() {
        tslib.__classPrivateFieldSet(this, _Fragment_shadow, [], "f");
        if (tslib.__classPrivateFieldGet(this, _Fragment_shown, "f")) {
            this.eachChildView((view) => {
                const animation = getViewEndingAnimate.getViewEndingAnimate(view);
                if (!animation) {
                    this.removeChild(view);
                    return true;
                }
                view.animate(animation).then(() => {
                    this.removeChild(view);
                });
                return true;
            });
        }
    }
}
_Fragment_shown = new WeakMap(), _Fragment_shadow = new WeakMap();

exports.Fragment = Fragment;
