import { useChildren } from '@innet/jsx';
import { ViewBase, View, Frame } from '@nativescript/core';
import { watchValueToValueWatcher, use } from '@watch-state/utils';
import innet, { useApp, NEXT, useHandler } from 'innet';
import { Watch, onDestroy, unwatch } from 'watch-state';
import { PARENT_FRAME } from '../../constants.es6.js';
import '../../hooks/index.es6.js';
import '../../utils/index.es6.js';
import { JSX_ELEMENTS, useView } from '../../hooks/useView/useView.es6.js';
import { isAnimateProp } from '../../utils/isAnimateProp/isAnimateProp.es6.js';
import { isAnimateParam } from '../../utils/isAnimateParam/isAnimateParam.es6.js';
import { setParent } from '../../utils/setParent/setParent.es6.js';

function nativeJSX() {
    return () => {
        const { type: Type, props } = useApp();
        if ((typeof Type !== 'string' || !(Type in JSX_ELEMENTS)) && !((Type === null || Type === void 0 ? void 0 : Type.prototype) instanceof ViewBase))
            return NEXT;
        const children = useChildren();
        const handler = useHandler();
        const target = useView(Type);
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
                const setValue = (value) => {
                    if (key === 'scale' && target instanceof View) {
                        target.scaleX = value;
                        target.scaleY = value;
                    }
                    else {
                        // @ts-expect-error TODO: check it
                        target[key] = value;
                    }
                };
                if (typeof watchValue !== 'function') {
                    if (watchValue !== undefined) {
                        setValue(watchValue);
                    }
                    continue;
                }
                let prevValue;
                new Watch(update => {
                    const result = watchValue(update);
                    if (!update && result === undefined)
                        return;
                    if (!update) {
                        setValue(result);
                        prevValue = result;
                        return;
                    }
                    if (prevValue === result)
                        return;
                    prevValue = result;
                    const animate = unwatch(() => use(props.animate));
                    if (animate && isAnimateProp(key) && target instanceof View) {
                        const options = {};
                        if (isAnimateParam(key)) {
                            if (key === 'scale') {
                                options[key] = {
                                    x: result,
                                    y: result,
                                };
                            }
                            else if (key !== 'translate') {
                                options[key] = result;
                            }
                        }
                        else {
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
                        }
                        if (animate === true) {
                            target.animate(Object.assign(Object.assign({}, options), { duration: 250, curve: 'ease' }));
                            return;
                        }
                        if (typeof animate === 'number') {
                            target.animate(Object.assign(Object.assign({}, options), { duration: animate, curve: 'ease' }));
                            return;
                        }
                        if (key in animate) {
                            const animateParams = unwatch(() => use(animate[key]));
                            const params = typeof animateParams === 'number' ? { duration: animateParams } : animateParams;
                            target.animate(Object.assign(Object.assign(Object.assign({}, options), { curve: 'ease' }), params));
                            return;
                        }
                    }
                    setValue(result);
                });
            }
        }
        if (children) {
            const childrenHandler = Object.create(handler);
            if (target instanceof Frame) {
                childrenHandler[PARENT_FRAME] = target;
            }
            setParent(childrenHandler, target);
            innet(children, childrenHandler);
        }
        innet(target, handler);
    };
}

export { nativeJSX };
