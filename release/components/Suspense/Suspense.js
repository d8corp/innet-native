'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
var watchState = require('watch-state');
var constants = require('../../constants.js');
require('../../hooks/index.js');
require('../../utils/index.js');
var Fragment = require('../../utils/views/Fragment/Fragment.js');
var useChildrenHandler = require('../../hooks/useChildrenHandler/useChildrenHandler.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function Suspense({ fallback, children }) {
    const fragment = new Fragment.Fragment();
    const childrenHandler = useChildrenHandler.useChildrenHandler(fragment);
    const promises = new watchState.State(new Set());
    const showFallback = new watchState.Cache(() => Boolean(promises.value.size));
    childrenHandler[constants.SUSPENSE] = promises;
    new watchState.Watch(() => {
        fragment.shown = !showFallback.value;
    });
    innet__default["default"](fragment, innet.useHandler(), 2);
    innet__default["default"](children, childrenHandler);
    return () => showFallback.value ? fallback : null;
}

exports.Suspense = Suspense;
