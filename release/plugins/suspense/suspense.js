'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
var watchState = require('watch-state');
var constants = require('../../constants.js');

function suspense() {
    return () => {
        const promises = innet.useHandler()[constants.SUSPENSE];
        if (!promises)
            return innet.NEXT;
        const app = innet.useApp();
        let destroyed = false;
        promises.value.add(app);
        promises.update();
        watchState.onDestroy(() => {
            destroyed = true;
            promises.value.delete(app);
            promises.update();
        });
        app.finally(() => {
            if (!destroyed) {
                promises.value.delete(app);
                promises.update();
            }
        });
        return innet.NEXT;
    };
}

exports.suspense = suspense;
