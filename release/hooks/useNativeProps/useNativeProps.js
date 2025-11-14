'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var core = require('@nativescript/core');
var utils = require('@watch-state/utils');
var innet = require('innet');
var SyncTimer = require('sync-timer');
var watchState = require('watch-state');
var constants = require('../../constants.js');
require('../../utils/index.js');
var isAnimateParam = require('../../utils/isAnimateParam/isAnimateParam.js');
var setViewEndingAnimate = require('../../utils/setViewEndingAnimate/setViewEndingAnimate.js');
var setParent = require('../../utils/setParent/setParent.js');
var isAnimateProp = require('../../utils/isAnimateProp/isAnimateProp.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);
var SyncTimer__default = /*#__PURE__*/_interopDefaultLegacy(SyncTimer);

function useNativeProps(target, tagName) {
    var _a;
    const props = jsx.useProps();
    if (target instanceof core.View) {
        if (props.startingStyle) {
            for (const key in props.startingStyle) {
                // @ts-expect-error TODO: fix types
                target[key] = props.startingStyle[key];
            }
        }
        if (props.endingStyle) {
            const animate = watchState.unwatch(() => utils.use(props.animate));
            if (animate) {
                const animation = { curve: 'ease' };
                if (animate === true) {
                    animation.duration = 250;
                }
                else if (typeof animate === 'number') {
                    animation.duration = animate;
                }
                else {
                    for (const key in animate) {
                        const animateParams = watchState.unwatch(() => utils.use(animate[key]));
                        Object.assign(animation, typeof animateParams === 'number' ? { duration: animateParams } : animateParams);
                    }
                }
                for (const key in props.endingStyle) {
                    const value = props.endingStyle[key];
                    if (key === 'scale') {
                        animation[key] = {
                            x: value,
                            y: value,
                        };
                    }
                    else if (isAnimateParam.isAnimateParam(key)) {
                        animation[key] = value;
                    }
                    else {
                        const param = key.slice(0, -1);
                        const axis = key[key.length - 1].toLowerCase();
                        if (param === 'rotate') {
                            animation.rotate = axis === 'x'
                                ? {
                                    x: value,
                                    y: target.rotateY,
                                    z: target.rotate,
                                }
                                : {
                                    x: target.rotateX,
                                    y: value,
                                    z: target.rotate,
                                };
                        }
                        else {
                            animation[param] = axis === 'x'
                                ? {
                                    x: value,
                                    y: target[`${param}Y`],
                                }
                                : {
                                    x: target[`${param}X`],
                                    y: value,
                                };
                        }
                    }
                }
                setViewEndingAnimate.setViewEndingAnimate(target, animation);
            }
        }
    }
    let animateOptions = {};
    let timer;
    const forceRunAnimation = () => {
        if (!(target instanceof core.View))
            return;
        target.animate(animateOptions);
        animateOptions = {};
    };
    const runAnimation = () => {
        const currentTimer = Promise.resolve().then(() => {
            if (timer === currentTimer) {
                forceRunAnimation();
            }
        });
        timer = currentTimer;
    };
    const animate = (options, firstRender) => {
        if (!(target instanceof core.View))
            return;
        if (firstRender) {
            Object.assign(animateOptions, options);
            target.once('loaded', () => {
                new SyncTimer__default["default"](runAnimation);
            });
            return;
        }
        if (target.isLoaded) {
            Object.assign(animateOptions, options);
            runAnimation();
            return;
        }
        Object.assign(animateOptions, options);
        target.once('loaded', runAnimation);
    };
    for (const key in props) {
        if (['children', 'animate', 'startingStyle'].includes(key))
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
        if (tagName && tagName in constants.RENDER_PROPS && key in constants.RENDER_PROPS[tagName]) {
            const tag = tagName;
            const tagView = constants.RENDER_PROPS[tag][key];
            const propHandler = Object.create(innet.useHandler());
            setParent.setParent(propHandler, (view) => {
                if (view instanceof tagView) {
                    // @ts-expect-error TODO: check types
                    target[key] = view;
                    return;
                }
                throw Error(`You cannot use ${String(view)} in <${tagName} ${key}={...}>`);
            });
            const watchValue = utils.watchValueToValueWatcher(value);
            if (typeof watchValue === 'function') {
                new watchState.Watch((update) => {
                    innet__default["default"](utils.use(watchValue, update), propHandler);
                });
                continue;
            }
            innet__default["default"](watchValue, propHandler);
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
        const createAnimateOptions = () => {
            if (!(target instanceof core.View))
                return;
            const animate = watchState.unwatch(() => utils.use(props.animate));
            if (!animate || !isAnimateProp.isAnimateProp(key))
                return;
            if (animate === true) {
                return { duration: 250, curve: 'ease' };
            }
            if (typeof animate === 'number') {
                return { duration: animate, curve: 'ease' };
            }
            if (key in animate) {
                const animateParams = watchState.unwatch(() => utils.use(animate[key]));
                const params = typeof animateParams === 'number' ? { duration: animateParams } : animateParams;
                return Object.assign({ curve: 'ease' }, params);
            }
        };
        const getAnimateOptions = (result) => {
            const options = createAnimateOptions();
            if (!options)
                return;
            if (isAnimateParam.isAnimateParam(key)) {
                if (key === 'scale') {
                    options[key] = {
                        x: result,
                        y: result,
                    };
                }
                else {
                    options[key] = result;
                }
                return options;
            }
            const param = key.slice(0, -1);
            const axis = key[key.length - 1].toLowerCase();
            if (param === 'rotate') {
                options.rotate = axis === 'x'
                    ? {
                        x: result,
                        y: target.rotateY,
                        z: target.rotate,
                    }
                    : {
                        x: target.rotateX,
                        y: result,
                        z: target.rotate,
                    };
            }
            else {
                options[param] = axis === 'x'
                    ? {
                        x: result,
                        y: target[`${param}Y`],
                    }
                    : {
                        x: target[`${param}X`],
                        y: result,
                    };
            }
            return options;
        };
        const setValue = (value, update, firstRender) => {
            if (target instanceof core.View) {
                if (update) {
                    const options = getAnimateOptions(value);
                    if (options) {
                        animate(options, firstRender);
                        return;
                    }
                }
                if (key === 'scale') {
                    target.scaleX = value;
                    target.scaleY = value;
                    return;
                }
            }
            // @ts-expect-error TODO: check it
            target[key] = value;
        };
        if (typeof watchValue !== 'function') {
            if (props.startingStyle && key in props.startingStyle && target instanceof core.View) {
                setValue(watchValue, true, true);
            }
            else if (watchValue !== undefined) {
                setValue(watchValue, false, true);
            }
            continue;
        }
        let prevValue = (_a = props.startingStyle) === null || _a === void 0 ? void 0 : _a[key];
        new watchState.Watch(update => {
            const result = watchValue(update);
            if (!update && result === undefined)
                return;
            if (!update) {
                setValue(result, Boolean(props.startingStyle && key in props.startingStyle && target instanceof core.View), true);
                prevValue = result;
                return;
            }
            if (prevValue === result)
                return;
            setValue(result, true, false);
            prevValue = result;
        });
    }
}

exports.useNativeProps = useNativeProps;
