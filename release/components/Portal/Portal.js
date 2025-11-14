'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
var watchState = require('watch-state');
require('../../hooks/index.js');
require('../../utils/index.js');
var Fragment = require('../../utils/views/Fragment/Fragment.js');
var useChildrenHandler = require('../../hooks/useChildrenHandler/useChildrenHandler.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function Portal({ parent, children }) {
    const fragment = new Fragment.Fragment();
    const childHandler = useChildrenHandler.useChildrenHandler(fragment);
    parent.addChild(fragment);
    watchState.onDestroy(() => { parent.removeChild(fragment); });
    innet__default["default"](children, childHandler);
}

exports.Portal = Portal;
