import { type JSXElement } from '@innet/jsx';
import { arraySync } from '@innet/utils';
import { type View, type ViewBase } from '@nativescript/core';
import { type Observable } from 'watch-state';
import { nativeFn, nativeNode, nativeText, suspense } from '../plugins';
export declare const arrayPlugins: (typeof arraySync)[];
export declare const objectPlugins: (() => import("innet").HandlerPlugin)[];
export declare const fnPlugins: (typeof nativeFn)[];
export declare const stringPlugins: (typeof nativeText)[];
export declare const numberPlugins: (typeof nativeText)[];
export declare const nodePlugins: (typeof nativeNode)[];
export declare const promisePlugins: (typeof suspense)[];
export declare const handler: import("innet").Handler;
declare global {
    namespace JSX {
        type Element = PromiseElement | NonPromiseElement;
        type NonPromiseElement = ArrayElement | WatchElement | JSXElement | View | Generator<Element, void, unknown> | AsyncGenerator<Element, void, unknown> | Observable<Element> | boolean | null | number | string | symbol | undefined | void;
        interface ArrayElement extends Array<Element> {
        }
        type WatchElement = (update: boolean) => Element;
        type PromiseElement = Promise<NonPromiseElement>;
        type ElementClass = ViewBase;
        interface ElementAttributesProperty {
            props: {};
        }
        interface ElementChildrenAttribute {
            children: {};
        }
    }
}
