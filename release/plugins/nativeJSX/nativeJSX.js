'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var core = require('@nativescript/core');
var utils = require('@watch-state/utils');
var innet = require('innet');
var watchState = require('watch-state');
var constants = require('../../constants.js');
require('../../hooks/index.js');
require('../../utils/index.js');
var useView = require('../../hooks/useView/useView.js');
var setParent = require('../../utils/setParent/setParent.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function nativeJSX() {
    return () => {
        const { type: Type, props } = innet.useApp();
        if ((typeof Type !== 'string' || !(Type in useView.JSX_ELEMENTS)) && !((Type === null || Type === void 0 ? void 0 : Type.prototype) instanceof core.ViewBase))
            return innet.NEXT;
        const children = jsx.useChildren();
        const handler = innet.useHandler();
        const target = useView.useView(Type);
        if (props) {
            for (const key in props) {
                if (['children', 'animate'].includes(key))
                    continue;
                if (key === 'ref') {
                    if (props.ref) {
                        props.ref.value = target;
                    }
                    continue;
                }
                const value = props[key];
                if (key === 'style') {
                    if (value) {
                        for (const property in value) {
                            const rawValue = utils.watchValueToValueWatcher(value[property]);
                            if (typeof rawValue === 'function') {
                                new watchState.Watch(update => {
                                    target.style.setProperty(property, rawValue(update));
                                });
                            }
                            else {
                                target.style.setProperty(property, rawValue);
                            }
                        }
                    }
                    continue;
                }
                if (['ios', 'android'].includes(key)) {
                    if (value && target[key]) {
                        Object.assign(target[key], value);
                    }
                    continue;
                }
                if (key.startsWith('on')) {
                    if (value) {
                        const eventName = key[2].toLowerCase() + key.slice(3);
                        target.on(eventName, value);
                        watchState.onDestroy(() => {
                            target.off(eventName, value);
                        });
                    }
                    continue;
                }
                const watchValue = utils.watchValueToValueWatcher(value);
                if (typeof watchValue !== 'function') {
                    if (watchValue !== undefined) {
                        // @ts-expect-error TODO: check it
                        target[key] = watchValue;
                    }
                    continue;
                }
                let prevValue;
                new watchState.Watch(update => {
                    const result = watchValue(update);
                    if (!update && result === undefined)
                        return;
                    if (!update) {
                        // @ts-expect-error TODO: fix types
                        target[key] = result;
                        prevValue = result;
                        return;
                    }
                    if (prevValue === result)
                        return;
                    prevValue = result;
                    const animate = watchState.unwatch(() => utils.use(props.animate));
                    if (animate && constants.ANIMATE_PROPS.includes(key) && target instanceof core.View) {
                        if (animate === true) {
                            target.animate({ [key]: result, duration: 250 });
                            return;
                        }
                        if (typeof animate === 'number') {
                            target.animate({ [key]: result, duration: animate });
                            return;
                        }
                        if (key in animate) {
                            const animateParams = watchState.unwatch(() => utils.use(animate[key]));
                            const params = typeof animateParams === 'number' ? { duration: animateParams } : animateParams;
                            target.animate(Object.assign({ [key]: result }, params));
                            return;
                        }
                    }
                    // @ts-expect-error TODO: fix types
                    target[key] = result;
                });
            }
        }
        if (children) {
            const childrenHandler = Object.create(handler);
            if (target instanceof core.Frame) {
                childrenHandler[constants.PARENT_FRAME] = target;
            }
            setParent.setParent(childrenHandler, target);
            innet__default["default"](children, childrenHandler);
        }
        innet__default["default"](target, handler);
    };
}

exports.nativeJSX = nativeJSX;
