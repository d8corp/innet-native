import { Page } from '@nativescript/core';

class InPage extends Page {
    constructor() {
        super(...arguments);
        this.navigation = {};
    }
}

export { InPage };
