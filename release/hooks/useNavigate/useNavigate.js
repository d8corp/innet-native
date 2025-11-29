'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
var queueNanoTask = require('queue-nano-task');
var constants = require('../../constants.js');
require('../../utils/index.js');
var setParent = require('../../utils/setParent/setParent.js');
var getChildren = require('../../utils/getChildren/getChildren.js');
var updateChildren = require('../../utils/updateChildren/updateChildren.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var innet__default = /*#__PURE__*/_interopDefaultLegacy(innet);

function useNavigate() {
    const handler = innet.useNewHandler();
    const parentFrame = handler[constants.PARENT_FRAME];
    if (!parentFrame) {
        throw new Error('useNavigate must be used in a Frame context');
    }
    setParent.setParent(handler, parentFrame);
    return (page) => {
        queueNanoTask.queueNanotask(() => {
            getChildren.getChildren(parentFrame).length = 0;
            queueNanoTask.queueNanotask(() => {
                updateChildren.updateChildren(parentFrame);
            }, 1, true);
            innet__default["default"](page, handler, 0, true);
        }, 0, true);
    };
}

exports.useNavigate = useNavigate;
