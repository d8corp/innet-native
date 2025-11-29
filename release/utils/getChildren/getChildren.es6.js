import { CHILDREN } from '../../constants.es6.js';

function getChildren(target) {
    if (Array.isArray(target)) {
        return target;
    }
    if (!target[CHILDREN]) {
        target[CHILDREN] = [];
    }
    return target[CHILDREN];
}

export { getChildren };
