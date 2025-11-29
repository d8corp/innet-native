import type { AnimationDefinition, Color, CoreTypes, Observable as NativeObservable, Style as NativeStyle, View, ViewBase } from '@nativescript/core';
import type { WatchValue } from '@watch-state/utils';
import type { ANIMATE_PARAMS, ANIMATE_PROPS } from '../constants';
export type Style = Omit<NativeStyle, keyof NativeObservable | 'view' | 'viewRef' | 'fontInternal' | 'toString' | 'PropertyBag' | 'setScopedCssVariable' | 'setUnscopedCssVariable' | 'removeScopedCssVariable' | 'removeUnscopedCssVariable' | 'getCssVariable' | 'resetScopedCssVariables' | 'resetUnscopedCssVariables'>;
export type ObservableStyle = {
    [K in keyof Style]?: WatchValue<Style[K]>;
};
export type NSProp<T> = T extends Color | CoreTypes.PercentLengthType ? T | string : T extends View ? T | JSX.Element : T;
export type AnimatePropsParamsKey = typeof ANIMATE_PARAMS[number];
export type AnimatePropsKey = typeof ANIMATE_PROPS[number];
export type AnimateParamsKey = Exclude<keyof AnimationDefinition, AnimatePropsParamsKey | 'target'>;
export type AnimateParams = {
    [K in AnimateParamsKey]?: AnimationDefinition[K];
};
export type AnimateProp = Partial<Record<AnimatePropsParamsKey, WatchValue<AnimateParams | number>>>;
export type AnimateProps = {
    [K in AnimatePropsKey]?: WatchValue<K extends keyof View ? View[K] : number>;
};
export type GetNSProps<T extends object> = {
    [K in keyof T]?: WatchValue<NSProp<T[K]>>;
};
export type Parent<T extends ViewBase = ViewBase> = T | T[];
