'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const PARENT = Symbol('parent');
const FOR_VALUE = Symbol('FOR_VALUE');
const FOR_INDEX = Symbol('FOR_INDEX');
const FOR_WATCHER_KEY = Symbol('FOR_WATCHER_KEY');
const PARENT_FRAME = Symbol('PARENT_FRAME');
const ENDING_ANIMATE = Symbol('ENDING_ANIMATE');
const SUSPENSE = Symbol('SUSPENSE');
const CHILDREN = Symbol('CHILDREN');
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

exports.ANIMATE_PARAMS = ANIMATE_PARAMS;
exports.ANIMATE_PARAMS_PROPS = ANIMATE_PARAMS_PROPS;
exports.ANIMATE_PROPS = ANIMATE_PROPS;
exports.CHILDREN = CHILDREN;
exports.ENDING_ANIMATE = ENDING_ANIMATE;
exports.FOR_INDEX = FOR_INDEX;
exports.FOR_VALUE = FOR_VALUE;
exports.FOR_WATCHER_KEY = FOR_WATCHER_KEY;
exports.PARENT = PARENT;
exports.PARENT_FRAME = PARENT_FRAME;
exports.SUSPENSE = SUSPENSE;
