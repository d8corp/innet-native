import { useHandler } from 'innet';
import '../../utils/index.es6.js';
import { setParent } from '../../utils/setParent/setParent.es6.js';

function useChildrenHandler(view) {
    const handler = Object.create(useHandler());
    setParent(handler, view);
    return handler;
}

export { useChildrenHandler };
