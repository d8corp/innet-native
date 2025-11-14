import { useChildren } from '@innet/jsx';
import { Frame } from '@nativescript/core';
import innet, { useHandler } from 'innet';
import { PARENT_FRAME } from '../../constants.es6.js';
import '../../utils/index.es6.js';
import { setParent } from '../../utils/setParent/setParent.es6.js';

function useNativeChildren(target) {
    const children = useChildren();
    if (children) {
        const handler = useHandler();
        const childrenHandler = Object.create(handler);
        if (target instanceof Frame) {
            childrenHandler[PARENT_FRAME] = target;
        }
        setParent(childrenHandler, target);
        innet(children, childrenHandler);
    }
}

export { useNativeChildren };
