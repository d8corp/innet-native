import innet, { useHandler, useApp } from 'innet';
import { onDestroy, scope } from 'watch-state';
import '../../hooks/index.es6.js';
import '../../utils/index.es6.js';
import { Fragment } from '../../utils/views/Fragment/Fragment.es6.js';
import { useChildrenHandler } from '../../hooks/useChildrenHandler/useChildrenHandler.es6.js';

function nativeAsync() {
    return () => {
        const handler = useHandler();
        const app = useApp();
        const fragment = new Fragment();
        const childHandler = useChildrenHandler(fragment);
        innet(fragment, handler, 0, true);
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
