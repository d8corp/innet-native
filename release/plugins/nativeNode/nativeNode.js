'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@nativescript/core');
var innet = require('innet');
var queueNanoTask = require('queue-nano-task');
var constants = require('../../constants.js');
require('../../hooks/index.js');
require('../../utils/index.js');
var useParent = require('../../hooks/useParent/useParent.js');
var getChildren = require('../../utils/getChildren/getChildren.js');
var updateChildren = require('../../utils/updateChildren/updateChildren.js');

function nativeNode() {
    return () => {
        const app = innet.useApp();
        const parent = useParent.useParent();
        if (Array.isArray(parent)) {
            parent.push(app);
        }
        else {
            const parentChildren = getChildren.getChildren(parent);
            if (app instanceof core.Page) {
                const handler = innet.useHandler();
                const parentFrame = handler[constants.PARENT_FRAME];
                if (!parentFrame) {
                    throw Error(`You can place ${app} only in a Frame`);
                }
                if (parent instanceof core.Frame) {
                    parentChildren.push(app);
                }
                else {
                    queueNanoTask.queueNanotask(() => {
                        parentFrame.navigate(Object.assign(Object.assign({}, app.navigation), { create: () => app }));
                    }, 1, true);
                }
            }
            else {
                parentChildren.push(app);
            }
        }
        queueNanoTask.queueNanotask(() => {
            updateChildren.updateChildren(app);
        }, 1, true);
    };
}

exports.nativeNode = nativeNode;
