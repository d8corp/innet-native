import { Ref } from '@innet/utils';
import { LayoutBase } from '@nativescript/core';
import { onDestroy } from 'watch-state';
import '../Fragment/index.es6.js';
import '../getParent/index.es6.js';
import '../setParent/index.es6.js';
import { Fragment } from '../Fragment/Fragment.es6.js';
import { setParent } from '../setParent/setParent.es6.js';
import { getParent } from '../getParent/getParent.es6.js';

function getContainer(handler, freeParent = false, parent = getParent(handler)) {
    const container = new Fragment();
    const childHandler = Object.create(handler);
    setParent(childHandler, container);
    if (parent instanceof Ref) {
        parent.value = container;
        return [childHandler, container];
    }
    if (parent instanceof LayoutBase) {
        parent.addChild(container);
        if (!freeParent) {
            onDestroy(() => { parent.removeChild(container); });
        }
        return [childHandler, container];
    }
    throw Error(`You cannot get content, parent is ${parent === null || parent === void 0 ? void 0 : parent.typeName}`);
}

export { getContainer };
