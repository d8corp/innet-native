import innet, { useHandler, useApp } from 'innet';
import { onDestroy, scope } from 'watch-state';
import '../../hooks/index.es6.js';
import { useView } from '../../hooks/useView/useView.es6.js';
import { useChildrenHandler } from '../../hooks/useChildrenHandler/useChildrenHandler.es6.js';

function nativeAsync() {
    return () => {
        const handler = useHandler();
        const app = useApp();
        const fragment = useView('fragment');
        const childHandler = useChildrenHandler(fragment);
        innet(fragment, handler);
        let removed = false;
        onDestroy(() => {
            removed = true;
        });
        const { activeWatcher } = scope;
        app.then(data => {
            if (!removed) {
                scope.activeWatcher = activeWatcher;
                innet(data, childHandler);
                scope.activeWatcher = undefined;
            }
        });
    };
}

export { nativeAsync };
