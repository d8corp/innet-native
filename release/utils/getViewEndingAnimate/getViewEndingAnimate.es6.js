import { ENDING_ANIMATE } from '../../constants.es6.js';

function getViewEndingAnimate(view) {
    // @ts-expect-error Hack for ending animations
    return view[ENDING_ANIMATE];
}

export { getViewEndingAnimate };
