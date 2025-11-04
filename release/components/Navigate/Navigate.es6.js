import { __rest } from 'tslib';
import { EMPTY } from '@innet/jsx';
import innet, { useHandler } from 'innet';
import { PARENT_FRAME, PARENT_NAVIGATE } from '../../constants.es6.js';

function Navigate(props) {
    const handler = useHandler();
    if ('create' in props || 'moduleName' in props) {
        const frame = handler[PARENT_FRAME];
        if (!frame) {
            throw Error('You can place <Navigate /> only in a <frame>');
        }
        frame.navigate(props);
    }
    else {
        const childHandler = Object.create(handler);
        const _a = props, { children } = _a, rest = __rest(_a, ["children"]);
        handler[PARENT_NAVIGATE] = rest;
        innet(children, childHandler);
    }
    return EMPTY;
}

export { Navigate };
