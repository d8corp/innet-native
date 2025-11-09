import { ANIMATE_PARAMS } from '../../constants.es6.js';

function isAnimateParam(key) {
    return ANIMATE_PARAMS.includes(key);
}

export { isAnimateParam };
