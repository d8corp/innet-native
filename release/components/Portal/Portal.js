'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsx = require('@innet/jsx');
var innet = require('innet');
var queueNanoTask = require('queue-nano-task');
require('../../utils/index.js');
var setParent = require('../../utils/setParent/setParent.js');
var updateChildren = require('../../utils/updateChildren/updateChildren.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function Portal({ parent, children }) {
    const childrenHandler = innet.useNewHandler();
    setParent.setParent(childrenHandler, parent);
    queueNanoTask.queueNanotask(() => {
        updateChildren.updateChildren(parent);
    }, 1, true);
    innet__default["default"](children, childrenHandler, 0, true);
    return jsx.EMPTY;
}

exports.Portal = Portal;
