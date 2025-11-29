'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@watch-state/utils');
var queueNanoTask = require('queue-nano-task');

function onMount(callback) {
    queueNanoTask.queueNanotask(utils.withScope(callback), 1);
}

exports.onMount = onMount;
