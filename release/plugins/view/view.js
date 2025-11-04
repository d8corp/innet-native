'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@innet/utils');
var core = require('@nativescript/core');
var innet = require('innet');

const view = utils.createConditionPlugin(() => innet.useApp() instanceof core.ViewBase);

exports.view = view;
