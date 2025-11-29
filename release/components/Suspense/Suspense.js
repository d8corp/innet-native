'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var innet = require('innet');
var watchState = require('watch-state');
var constants = require('../../constants.js');
require('../../hooks/index.js');
var useChildrenFragment = require('../../hooks/useChildrenFragment/useChildrenFragment.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function Suspense({ fallback, children }) {
    const [childrenHandler, fragment] = useChildrenFragment.useChildrenFragment();
    const promises = new watchState.State(new Set());
    const showFallback = new watchState.Cache(() => Boolean(promises.value.size));
    childrenHandler[constants.SUSPENSE] = promises;
    innet__default["default"]([() => showFallback.value ? fallback : null, fragment], innet.useHandler(), 0, true);
    innet__default["default"](children, childrenHandler, 0, true);
    new watchState.Watch(() => {
        fragment.visibility = showFallback.value ? 'hidden' : 'visible';
    });
    return jsx.EMPTY;
}

exports.Suspense = Suspense;
