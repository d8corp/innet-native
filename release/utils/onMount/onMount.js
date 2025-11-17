'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var queueNanoTask = require('queue-nano-task');

function onMount(callback) {
    queueNanoTask.queueNanotask(callback, 1);
}

exports.onMount = onMount;
