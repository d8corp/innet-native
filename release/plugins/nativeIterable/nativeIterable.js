'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var jsx = require('@innet/jsx');
var utils = require('@watch-state/utils');
var innet = require('innet');
var queueNanoTask = require('queue-nano-task');
var watchState = require('watch-state');
require('../../hooks/index.js');
var useChildrenFragment = require('../../hooks/useChildrenFragment/useChildrenFragment.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

const nativeIterable = () => () => {
    const genericComponent = innet.useApp();
    if (!(genericComponent instanceof jsx.GenericComponent))
        return innet.NEXT;
    const { app: apps, data } = genericComponent;
    if (!(data instanceof Promise)) {
        queueNanoTask.queueNanotask(() => genericComponent.app.next(), 0, true);
        innet__default["default"](data.value, innet.useHandler(), 0, true);
        return;
    }
    const [childrenHandler, fragment] = useChildrenFragment.useChildrenFragment();
    let watcher;
    let deleted = false;
    innet__default["default"](fragment, innet.useHandler(), 0, true);
    watchState.onDestroy(() => {
        deleted = true;
    });
    const call = utils.withScope((app) => {
        if (watcher) {
            watcher.destroy();
            fragment.removeChildren();
        }
        watcher = new watchState.Watch(update => {
            if (update) {
                fragment.removeChildren();
            }
            innet__default["default"](app, childrenHandler, 0, true);
        });
    });
    const run = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        try {
            for (var _d = true, apps_1 = tslib.__asyncValues(apps), apps_1_1; apps_1_1 = yield apps_1.next(), _a = apps_1_1.done, !_a; _d = true) {
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

exports.nativeIterable = nativeIterable;
