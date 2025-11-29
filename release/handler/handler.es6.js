import { jsxComponent } from '@innet/jsx';
import { arraySync, nullish, promise, fn, string, number, array, object } from '@innet/utils';
import { createHandler } from 'innet';
import '../plugins/index.es6.js';
import { state } from '../plugins/state/state.es6.js';
import { nativeIterable } from '../plugins/nativeIterable/nativeIterable.es6.js';
import { nativeJSX } from '../plugins/nativeJSX/nativeJSX.es6.js';
import { nativeFn } from '../plugins/nativeFn/nativeFn.es6.js';
import { nativeText } from '../plugins/nativeText/nativeText.es6.js';
import { nativeNode } from '../plugins/nativeNode/nativeNode.es6.js';
import { suspense } from '../plugins/suspense/suspense.es6.js';
import { nativeAsync } from '../plugins/nativeAsync/nativeAsync.es6.js';
import { native } from '../plugins/native/native.es6.js';
import { view } from '../plugins/view/view.es6.js';

const arrayPlugins = [
    arraySync,
];
const objectPlugins = [
    state,
    nativeIterable,
    nativeJSX,
    jsxComponent,
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
const handler = createHandler([
    native,
    nullish([]),
    promise(promisePlugins),
    view(nodePlugins),
    fn(fnPlugins),
    string(stringPlugins),
    number(numberPlugins),
    array(arrayPlugins),
    object(objectPlugins),
]);

export { arrayPlugins, fnPlugins, handler, nodePlugins, numberPlugins, objectPlugins, promisePlugins, stringPlugins };
