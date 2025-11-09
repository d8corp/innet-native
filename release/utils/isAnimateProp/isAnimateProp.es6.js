import { ANIMATE_PROPS } from '../../constants.es6.js';

function isAnimateProp(key) {
    return ANIMATE_PROPS.includes(key);
}

export { isAnimateProp };
