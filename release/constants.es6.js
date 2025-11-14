import { ActionBar } from '@nativescript/core';

const RENDER_PROPS = {
    page: {
        actionBar: ActionBar,
    },
};
const PARENT = Symbol('parent');
const FOR_VALUE = Symbol('FOR_VALUE');
const FOR_INDEX = Symbol('FOR_INDEX');
const FOR_WATCHER_KEY = Symbol('FOR_WATCHER_KEY');
const PARENT_FRAME = Symbol('PARENT_FRAME');
const PARENT_NAVIGATE = Symbol('PARENT_NAVIGATE');
const ENDING_ANIMATE = Symbol('ENDING_ANIMATE');
const ANIMATE_PARAMS_PROPS = [
    'height',
    'width',
    'opacity',
    'backgroundColor',
    'rotate',
    'scale',
];
const ANIMATE_PARAMS = [
    ...ANIMATE_PARAMS_PROPS,
    'translate',
];
const ANIMATE_PROPS = [
    ...ANIMATE_PARAMS_PROPS,
    'scaleX',
    'scaleY',
    'translateX',
    'translateY',
    'rotateX',
    'rotateY',
];

export { ANIMATE_PARAMS, ANIMATE_PARAMS_PROPS, ANIMATE_PROPS, ENDING_ANIMATE, FOR_INDEX, FOR_VALUE, FOR_WATCHER_KEY, PARENT, PARENT_FRAME, PARENT_NAVIGATE, RENDER_PROPS };
