import innet, { useApp, useHandler } from 'innet';
import { queueNanotask } from 'queue-nano-task';
import { scope, onDestroy } from 'watch-state';
import '../../hooks/index.es6.js';
import '../../utils/index.es6.js';
import { useChildrenFragment } from '../../hooks/useChildrenFragment/useChildrenFragment.es6.js';
import { updateChildren } from '../../utils/updateChildren/updateChildren.es6.js';

function nativeAsync() {
    return () => {
        const { activeWatcher } = scope;
        const app = useApp();
        const [childrenHandler, fragment] = useChildrenFragment();
        innet(fragment, useHandler(), 0, true);
        let removed = false;
        onDestroy(() => {
            removed = true;
        });
        app.then(data => {
            if (!removed) {
                scope.activeWatcher = activeWatcher;
                innet(data, childrenHandler, 0, true);
                queueNanotask(() => {
                    updateChildren(fragment);
                }, 1, true);
                scope.activeWatcher = undefined;
            }
        });
    };
}

export { nativeAsync };
