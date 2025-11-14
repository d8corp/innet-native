import { scope, onDestroy } from 'watch-state';
import '../../utils/index.es6.js';
import { onMount } from '../../utils/onMount/onMount.es6.js';

function useMount(callback) {
    const { activeWatcher } = scope;
    onMount(() => {
        scope.activeWatcher = activeWatcher;
        const result = callback();
        if (result) {
            onDestroy(result);
        }
        scope.activeWatcher = undefined;
    });
}

export { useMount };
