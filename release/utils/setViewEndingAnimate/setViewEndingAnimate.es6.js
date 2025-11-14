import { ENDING_ANIMATE } from '../../constants.es6.js';

function setViewEndingAnimate(view, animate) {
    // @ts-expect-error Hack for ending animations
    view[ENDING_ANIMATE] = animate;
}

export { setViewEndingAnimate };
