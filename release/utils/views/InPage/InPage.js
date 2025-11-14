'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@nativescript/core');

class InPage extends core.Page {
    constructor() {
        super(...arguments);
        this.navigation = {};
    }
}

exports.InPage = InPage;
