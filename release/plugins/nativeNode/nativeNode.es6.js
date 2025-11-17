import { Span, FormattedString, TextBase, ActionBar, ActionItem, SegmentedBarItem, SegmentedBar, TabViewItem, TabView, View, LayoutBase, ContentView } from '@nativescript/core';
import { useApp, useHandler } from 'innet';
import { queueNanotask } from 'queue-nano-task';
import { PARENT_FRAME } from '../../constants.es6.js';
import '../../hooks/index.es6.js';
import '../../utils/index.es6.js';
import { useParent } from '../../hooks/useParent/useParent.es6.js';
import { InPage } from '../../utils/views/InPage/InPage.es6.js';

function nativeNode() {
    return () => {
        const parent = useParent();
        const app = useApp();
        queueNanotask(() => {
            if (typeof parent === 'function') {
                parent(app);
                return;
            }
            if (app instanceof InPage) {
                const handler = useHandler();
                const frame = handler[PARENT_FRAME];
                if (!frame) {
                    throw Error('You can place <page> only in a <frame>');
                }
                frame.navigate(Object.assign(Object.assign({}, app.navigation), { create: () => app }));
                return;
            }
            if (app instanceof Span) {
                if (parent instanceof FormattedString) {
                    parent.spans.unshift(app);
                    return;
                }
                throw Error(`You can place <span> only in <string>, current parent: ${parent.typeName}`);
            }
            if (app instanceof FormattedString) {
                if (parent instanceof TextBase) {
                    parent.formattedText = app;
                    return;
                }
                throw Error(`You can place <string> only in text based elements, current parent: ${parent.typeName}`);
            }
            if (app instanceof ActionBar) {
                if (parent instanceof InPage) {
                    parent.actionBar = app;
                    return;
                }
                throw Error(`You can place <action-bar> only in <page>, current parent: ${parent.typeName}`);
            }
            if (app instanceof ActionItem) {
                if (parent instanceof ActionBar) {
                    parent.actionItems.addItem(app);
                    return;
                }
                throw Error(`You can place <action-item> only in <action-bar>, current parent: ${parent.typeName}`);
            }
            if (app instanceof SegmentedBarItem) {
                if (parent instanceof SegmentedBar) {
                    if (!parent.items) {
                        parent.items = [];
                    }
                    parent.items.unshift(app);
                    return;
                }
                throw Error(`You can place <segmented-bar-item> only in <segmented-bar>, current parent: ${parent.typeName}`);
            }
            if (app instanceof TabViewItem) {
                if (parent instanceof TabView) {
                    if (parent.items) {
                        parent.items = [app, ...parent.items];
                    }
                    else {
                        parent.items = [app];
                    }
                    return;
                }
                throw Error(`You can place <tab-view-item> only in <tab-view>, current parent: ${parent.typeName}`);
            }
            if (app instanceof View) {
                if (parent instanceof ActionBar) {
                    parent.titleView = app;
                    return;
                }
                if (parent instanceof LayoutBase) {
                    parent.insertChild(app, 0);
                    return;
                }
                if (parent instanceof ContentView) {
                    parent.content = app;
                    return;
                }
                if (parent instanceof ActionItem) {
                    parent.actionView = app;
                    return;
                }
                if (parent instanceof TabViewItem) {
                    parent.view = app;
                    return;
                }
                throw Error(`${app.typeName} cannot be in ${parent.typeName}`);
            }
            throw Error(`${app.typeName} cannot be in ${parent.typeName}`);
        }, 1, true);
    };
}

export { nativeNode };
