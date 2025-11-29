'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
var queueNanoTask = require('queue-nano-task');
var watchState = require('watch-state');
require('../../hooks/index.js');
require('../../utils/index.js');
var useChildrenFragment = require('../../hooks/useChildrenFragment/useChildrenFragment.js');
var updateChildren = require('../../utils/updateChildren/updateChildren.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function nativeAsync() {
    return () => {
        const { activeWatcher } = watchState.scope;
        const app = innet.useApp();
        const [childrenHandler, fragment] = useChildrenFragment.useChildrenFragment();
        innet__default["default"](fragment, innet.useHandler(), 0, true);
        let removed = false;
        watchState.onDestroy(() => {
            removed = true;
        });
        app.then(data => {
            if (!removed) {
                watchState.scope.activeWatcher = activeWatcher;
                innet__default["default"](data, childrenHandler, 0, true);
                queueNanoTask.queueNanotask(() => {
                    updateChildren.updateChildren(fragment);
                }, 1, true);
                watchState.scope.activeWatcher = undefined;
            }
        });
    };
}

exports.nativeAsync = nativeAsync;
