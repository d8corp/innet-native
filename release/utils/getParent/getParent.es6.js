import { PARENT } from '../../constants.es6.js';

function getParent(handler) {
    return handler[PARENT];
}

export { getParent };
