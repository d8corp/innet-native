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

function nativeAsync() {
    return () => {
        const handler = innet.useHandler();
        const app = innet.useApp();
        const fragment = new Fragment.Fragment();
        const childHandler = useChildrenHandler.useChildrenHandler(fragment);
        innet__default["default"](fragment, handler, 2);
        let removed = false;
        watchState.onDestroy(() => {
            removed = true;
        });
        const { activeWatcher } = watchState.scope;
        app.then(data => {
            if (!removed) {
                watchState.scope.activeWatcher = activeWatcher;
                innet__default["default"](data, childHandler);
                watchState.scope.activeWatcher = undefined;
            }
        });
    };
}

exports.nativeAsync = nativeAsync;
