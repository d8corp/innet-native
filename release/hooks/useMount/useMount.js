'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var watchState = require('watch-state');
require('../../utils/index.js');
var onMount = require('../../utils/onMount/onMount.js');

function useMount(callback) {
    const { activeWatcher } = watchState.scope;
    onMount.onMount(() => {
        watchState.scope.activeWatcher = activeWatcher;
        const result = callback();
        if (result) {
            watchState.onDestroy(result);
        }
        watchState.scope.activeWatcher = undefined;
    });
}

exports.useMount = useMount;
