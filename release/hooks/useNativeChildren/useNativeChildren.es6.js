import { useChildren } from '@innet/jsx';
import { Frame } from '@nativescript/core';
import innet, { useNewHandler } from 'innet';
import { PARENT_FRAME } from '../../constants.es6.js';
import '../../utils/index.es6.js';
import { setParent } from '../../utils/setParent/setParent.es6.js';

function useNativeChildren(target) {
    const children = useChildren();
    if (!children)
        return;
    const childrenHandler = useNewHandler();
    setParent(childrenHandler, target);
    if (target instanceof Frame) {
        childrenHandler[PARENT_FRAME] = target;
    }
    innet(children, childrenHandler, 0, true);
}

export { useNativeChildren };
