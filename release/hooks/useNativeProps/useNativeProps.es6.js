import { useProps } from '@innet/jsx';
import { Page, ActionBar, View, TextField, FormattedString, TextView, ActionItem, TabViewItem } from '@nativescript/core';
import { use, watchValueToValueWatcher, withScope } from '@watch-state/utils';
import innet, { useNewHandler } from 'innet';
import { queueNanotask } from 'queue-nano-task';
import SyncTimer from 'sync-timer';
import { unwatch, Watch, onDestroy } from 'watch-state';
import { PARENT } from '../../constants.es6.js';
import '../../utils/index.es6.js';
import { isAnimateParam } from '../../utils/isAnimateParam/isAnimateParam.es6.js';
import { setViewEndingAnimate } from '../../utils/setViewEndingAnimate/setViewEndingAnimate.es6.js';
import { isAnimateProp } from '../../utils/isAnimateProp/isAnimateProp.es6.js';

const RENDER_PROPS = new Map([
    [Page, {
            actionBar: ActionBar,
            content: View,
        }],
    [TextField, {
            formattedText: FormattedString,
        }],
    [TextView, {
            formattedText: FormattedString,
        }],
    [ActionBar, {
            titleView: View,
        }],
    [ActionItem, {
            actionView: View,
        }],
    [TabViewItem, {
            view: View,
        }],
]);
function useNativeProps(target) {
    var _a;
    const props = useProps();
    if (target instanceof View) {
        if (props.startingStyle) {
            for (const key in props.startingStyle) {
                // @ts-expect-error TODO: fix types
                target[key] = props.startingStyle[key];
            }
        }
        if (props.endingStyle) {
            const animate = unwatch(() => use(props.animate));
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
                        const animateParams = unwatch(() => use(animate[key]));
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
                    else if (isAnimateParam(key)) {
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
                setViewEndingAnimate(target, animation);
            }
        }
    }
    let animateOptions = {};
    let timer;
    const forceRunAnimation = () => {
        if (!(target instanceof View))
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
        if (!(target instanceof View))
            return;
        if (firstRender) {
            Object.assign(animateOptions, options);
            target.once('loaded', () => {
                new SyncTimer(runAnimation);
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
                    const rawValue = watchValueToValueWatcher(value[property]);
                    if (typeof rawValue === 'function') {
                        new Watch(update => {
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
        const renderProps = RENDER_PROPS.get(target === null || target === void 0 ? void 0 : target.constructor);
        if (renderProps && key in renderProps) {
            const PropView = renderProps[key];
            const propHandler = useNewHandler();
            const children = propHandler[PARENT] = [];
            const render = () => {
                const view = children[0];
                if (view instanceof PropView) {
                    // @ts-expect-error TODO: check types
                    target[key] = view;
                    return;
                }
                throw Error(`You cannot use ${String(view)} in <${target.constructor.name} ${key}={...}>`);
            };
            const watchValue = watchValueToValueWatcher(value);
            if (typeof watchValue === 'function') {
                new Watch((update) => {
                    const result = watchValue(update);
                    queueNanotask(withScope(() => {
                        queueNanotask(render, 1, true);
                        innet(result, propHandler, 0, true);
                    }), 0, true);
                });
                continue;
            }
            queueNanotask(render, 1, true);
            innet(watchValue, propHandler, 0, true);
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
                onDestroy(() => {
                    target.off(eventName, value);
                });
            }
            continue;
        }
        const watchValue = watchValueToValueWatcher(value);
        const createAnimateOptions = () => {
            if (!(target instanceof View))
                return;
            const animate = unwatch(() => use(props.animate));
            if (!animate || !isAnimateProp(key))
                return;
            if (animate === true) {
                return { duration: 250, curve: 'ease' };
            }
            if (typeof animate === 'number') {
                return { duration: animate, curve: 'ease' };
            }
            if (key in animate) {
                const animateParams = unwatch(() => use(animate[key]));
                const params = typeof animateParams === 'number' ? { duration: animateParams } : animateParams;
                return Object.assign({ curve: 'ease' }, params);
            }
        };
        const getAnimateOptions = (result) => {
            const options = createAnimateOptions();
            if (!options)
                return;
            if (isAnimateParam(key)) {
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
            if (target instanceof View) {
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
            if (props.startingStyle && key in props.startingStyle && target instanceof View) {
                setValue(watchValue, true, true);
            }
            else if (watchValue !== undefined) {
                setValue(watchValue, false, true);
            }
            continue;
        }
        let prevValue = (_a = props.startingStyle) === null || _a === void 0 ? void 0 : _a[key];
        new Watch(update => {
            const result = watchValue(update);
            if (!update && result === undefined)
                return;
            if (!update) {
                setValue(result, Boolean(props.startingStyle && key in props.startingStyle && target instanceof View), true);
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

export { useNativeProps };
