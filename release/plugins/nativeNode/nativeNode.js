'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@innet/utils');
var core = require('@nativescript/core');
var innet = require('innet');
var constants = require('../../constants.js');
require('../../hooks/index.js');
require('../../utils/index.js');
var useParent = require('../../hooks/useParent/useParent.js');
var Page = require('../../utils/Page/Page.js');

function nativeNode() {
    return () => {
        const parent = useParent.useParent();
        const app = innet.useApp();
        if (parent instanceof utils.Ref) {
            if (app instanceof core.View) {
                parent.value = app;
                return;
            }
            throw Error('Unexpected element used as a root view');
        }
        if (app instanceof Page.Page) {
            const handler = innet.useHandler();
            const frame = handler[constants.PARENT_FRAME];
            if (!frame) {
                throw Error('You can place <page> only in a <frame>');
            }
            frame.navigate(Object.assign(Object.assign({}, app.navigation), { create: () => app }));
            return;
        }
        if (app instanceof core.Span) {
            if (parent instanceof core.FormattedString) {
                parent.spans.push(app);
                return;
            }
            throw Error(`You can place <span> only in <string>, current parent: ${parent.typeName}`);
        }
        if (app instanceof core.FormattedString) {
            if (parent instanceof core.TextBase) {
                parent.formattedText = app;
                return;
            }
            throw Error(`You can place <string> only in text based elements, current parent: ${parent.typeName}`);
        }
        if (app instanceof core.ActionBar) {
            if (parent instanceof Page.Page) {
                parent.actionBar = app;
                return;
            }
            throw Error(`You can place <action-bar> only in <page>, current parent: ${parent.typeName}`);
        }
        if (app instanceof core.ActionItem) {
            if (parent instanceof core.ActionBar) {
                parent.actionItems.addItem(app);
                return;
            }
            throw Error(`You can place <action-item> only in <action-bar>, current parent: ${parent.typeName}`);
        }
        if (app instanceof core.SegmentedBarItem) {
            if (parent instanceof core.SegmentedBar) {
                if (!parent.items) {
                    parent.items = [];
                }
                parent.items.push(app);
                return;
            }
            throw Error(`You can place <segmented-bar-item> only in <segmented-bar>, current parent: ${parent.typeName}`);
        }
        if (app instanceof core.TabViewItem) {
            if (parent instanceof core.TabView) {
                if (parent.items) {
                    parent.items = [...parent.items, app];
                }
                else {
                    parent.items = [app];
                }
                return;
            }
            throw Error(`You can place <tab-view-item> only in <tab-view>, current parent: ${parent.typeName}`);
        }
        if (app instanceof core.View) {
            if (parent instanceof core.ActionBar) {
                parent.titleView = app;
                return;
            }
            if (parent instanceof core.LayoutBase) {
                parent.addChild(app);
                return;
            }
            if (parent instanceof core.ContentView) {
                parent.content = app;
                return;
            }
            if (parent instanceof core.ActionItem) {
                parent.actionView = app;
                return;
            }
            if (parent instanceof core.TabViewItem) {
                parent.view = app;
                return;
            }
            throw Error(`${app.typeName} cannot be in ${parent.typeName}`);
        }
        if (app instanceof core.ViewBase) {
            throw Error(`${app.typeName} cannot be in ${parent.typeName}`);
        }
        throw Error(`Unknown element in ${parent.typeName}`);
    };
}

exports.nativeNode = nativeNode;
