import { ProxyViewContainer } from '@nativescript/core';
import { useNewHandler } from 'innet';
import '../../utils/index.es6.js';
import { setParent } from '../../utils/setParent/setParent.es6.js';

function useChildrenFragment() {
    const fragment = new ProxyViewContainer();
    const childrenHandler = useNewHandler();
    setParent(childrenHandler, fragment);
    return [childrenHandler, fragment];
}

export { useChildrenFragment };
