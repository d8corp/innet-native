import { jsxComponent, jsxPlugins } from '@innet/jsx';
import { arraySync, nullish, promise, fn, string, number, array, object, callHandler } from '@innet/utils';
import { View, Application } from '@nativescript/core';
import innet, { createHandler, useApp } from 'innet';
import '../plugins/index.es6.js';
import '../utils/index.es6.js';
import { state } from '../plugins/state/state.es6.js';
import { nativeIterable } from '../plugins/nativeIterable/nativeIterable.es6.js';
import { nativeJSX } from '../plugins/nativeJSX/nativeJSX.es6.js';
import { nativeFn } from '../plugins/nativeFn/nativeFn.es6.js';
import { nativeText } from '../plugins/nativeText/nativeText.es6.js';
import { nativeNode } from '../plugins/nativeNode/nativeNode.es6.js';
import { suspense } from '../plugins/suspense/suspense.es6.js';
import { nativeAsync } from '../plugins/nativeAsync/nativeAsync.es6.js';
import { view } from '../plugins/view/view.es6.js';
import { setParent } from '../utils/setParent/setParent.es6.js';

const arrayPlugins = [
    arraySync,
];
const JSXPlugins = {};
const objectPlugins = [
    state,
    nativeIterable,
    nativeJSX,
    jsxComponent,
    jsxPlugins(JSXPlugins),
];
const fnPlugins = [
    nativeFn,
];
const stringPlugins = [
    nativeText,
];
const numberPlugins = [
    nativeText,
];
const nodePlugins = [
    nativeNode,
];
const promisePlugins = [
    suspense,
    nativeAsync,
];
const handlerInner = createHandler([
    nullish([]),
    promise(promisePlugins),
    view(nodePlugins),
    fn(fnPlugins),
    string(stringPlugins),
    number(numberPlugins),
    array(arrayPlugins),
    object(objectPlugins),
]);
const handler = createHandler([
    () => () => {
        const app = useApp();
        const handler = Object.create(handlerInner);
        setParent(handler, (view) => {
            if (!(view instanceof View)) {
                throw Error(`Unknown view ${String(view)} used as root`);
            }
            innet(() => {
                Application.run({ create: () => view });
            }, callHandler, 3);
        });
        innet(app, handler);
    },
]);

export { JSXPlugins, arrayPlugins, fnPlugins, handler, nodePlugins, numberPlugins, objectPlugins, promisePlugins, stringPlugins };
