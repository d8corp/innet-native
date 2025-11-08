const PARENT = Symbol('parent');
const FOR_VALUE = Symbol('FOR_VALUE');
const FOR_INDEX = Symbol('FOR_INDEX');
const FOR_WATCHER_KEY = Symbol('FOR_WATCHER_KEY');
const PARENT_FRAME = Symbol('PARENT_FRAME');
const PARENT_NAVIGATE = Symbol('PARENT_NAVIGATE');
const ANIMATE_PROPS = [
    'height',
    'width',
    'opacity',
    'backgroundColor',
    'rotate',
    'scale',
    'translate',
];

export { ANIMATE_PROPS, FOR_INDEX, FOR_VALUE, FOR_WATCHER_KEY, PARENT, PARENT_FRAME, PARENT_NAVIGATE };
