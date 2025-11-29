'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@watch-state/utils');
var innet = require('innet');
var queueNanoTask = require('queue-nano-task');
var watchState = require('watch-state');
require('../../hooks/index.js');
require('../../utils/index.js');
var useChildrenFragment = require('../../hooks/useChildrenFragment/useChildrenFragment.js');
var getChildren = require('../../utils/getChildren/getChildren.js');
var updateChildren = require('../../utils/updateChildren/updateChildren.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function nativeFn() {
    return () => {
        const fn = innet.useApp();
        const [childrenHandler, fragment] = useChildrenFragment.useChildrenFragment();
        const fragmentChildren = getChildren.getChildren(fragment);
        innet__default["default"](fragment, innet.useHandler(), 0, true);
        new watchState.Watch(update => {
            const children = fn(update);
            queueNanoTask.queueNanotask(utils.withScope(() => {
                if (update) {
                    fragmentChildren.length = 0;
                    queueNanoTask.queueNanotask(() => {
                        updateChildren.updateChildren(fragment, true);
                    }, 1, true);
                }
                innet__default["default"](children, childrenHandler, 0, true);
            }), 0, true);
        });
    };
}

exports.nativeFn = nativeFn;
