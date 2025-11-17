import { __awaiter, __asyncValues } from 'tslib';
import { GenericComponent } from '@innet/jsx';
import innet, { useApp, NEXT, useHandler } from 'innet';
import { queueNanotask } from 'queue-nano-task';
import { scope, onDestroy, Watch } from 'watch-state';
import '../../hooks/index.es6.js';
import '../../utils/index.es6.js';
import { Fragment } from '../../utils/views/Fragment/Fragment.es6.js';
import { useChildrenHandler } from '../../hooks/useChildrenHandler/useChildrenHandler.es6.js';

const nativeIterable = () => () => {
    const genericComponent = useApp();
    if (!(genericComponent instanceof GenericComponent))
        return NEXT;
    const handler = useHandler();
    const { app: apps, data } = genericComponent;
    if (!(data instanceof Promise)) {
        innet(data.value, handler);
        queueNanotask(() => genericComponent.app.next());
        return;
    }
    const fragment = new Fragment();
    const childrenHandler = useChildrenHandler(fragment);
    const { activeWatcher } = scope;
    let watcher;
    let deleted = false;
    innet(fragment, handler, 0, true);
    onDestroy(() => {
        deleted = true;
    });
    const call = (app) => {
        scope.activeWatcher = activeWatcher;
        if (watcher) {
            watcher.destroy();
            fragment.removeChildren();
        }
        watcher = new Watch(update => {
            if (update) {
                fragment.removeChildren();
            }
            innet(app, childrenHandler);
        });
        scope.activeWatcher = undefined;
    };
    const run = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        try {
            for (var _d = true, apps_1 = __asyncValues(apps), apps_1_1; apps_1_1 = yield apps_1.next(), _a = apps_1_1.done, !_a; _d = true) {
                _c = apps_1_1.value;
                _d = false;
                const app = _c;
                if (deleted)
                    return;
                call(app);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = apps_1.return)) yield _b.call(apps_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
    data.then(({ value }) => {
        call(value);
        run();
    });
};

export { nativeIterable };
