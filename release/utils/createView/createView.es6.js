import { JSX_ELEMENTS } from '../../elements.es6.js';

function createView(tagName) {
    return new JSX_ELEMENTS[tagName]();
}

export { createView };
