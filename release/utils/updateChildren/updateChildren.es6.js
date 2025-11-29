import { Page, View, ActionBar, Frame, FormattedString, Span, TextBase, ActionItem, SegmentedBar, SegmentedBarItem, TabView, TabViewItem, LayoutBase, ContentView } from '@nativescript/core';
import '../getChildren/index.es6.js';
import { getChildren } from '../getChildren/getChildren.es6.js';

function updateChildren(app, clear = false) {
    const children = getChildren(app);
    if (!children.length && !clear)
        return;
    if (app instanceof Page) {
        let actionBar;
        let content;
        for (let i = 0; i < children.length; i++) {
            if (i > 1) {
                throw Error(`${app} should have only one children View and one ActionBar, but you have ${children[i]} as a third child.`);
            }
            if (i === 1) {
                if (!(children[i] instanceof View)) {
                    throw Error(`${app} should have View as the second child, but you have ${children[i]}.`);
                }
                if (actionBar && children[i] instanceof ActionBar) {
                    throw Error(`${app} should not have ActionBar as the second child, but you have ${children[i]}.`);
                }
                content = children[i];
                continue;
            }
            if (children[0] instanceof ActionBar) {
                actionBar = children[0];
                continue;
            }
            if (!(children[0] instanceof View)) {
                throw Error(`${app} should have ActionBar or View as the first child, but you have ${children[0]}.`);
            }
            content = children[i];
        }
        if (actionBar) {
            app.actionBar = actionBar;
        }
        if (content) {
            app.content = content;
        }
        return;
    }
    if (app instanceof Frame) {
        for (const child of children) {
            if (!(child instanceof Page)) {
                throw Error(`${app} should have only Page in children, but you have ${child}.`);
            }
        }
        const child = children[0];
        app.navigate(Object.assign(Object.assign({}, child.navigation), { create: () => child }));
        return;
    }
    if (app instanceof FormattedString) {
        for (const child of children) {
            if (!(child instanceof Span)) {
                throw Error(`${app} should have only Span in children, but you have ${child}.`);
            }
        }
        if (clear) {
            app.spans.splice(0, app.spans.length, ...children);
        }
        else {
            app.spans.push(...children);
        }
        return;
    }
    if (app instanceof TextBase) {
        if (children.length > 1) {
            throw Error(`${app} should have one child, now it is [${children.join(', ')}].`);
        }
        if (!(children[0] instanceof FormattedString)) {
            throw Error(`${app} should have only FormattedString as a child, now it is ${children[0]}.`);
        }
        app.formattedText = children[0];
        return;
    }
    if (app instanceof ActionBar) {
        for (const child of children) {
            if (!(child instanceof ActionItem)) {
                throw Error(`${app} should have only ActionItem in children, but you have ${child}.`);
            }
        }
        if (clear) {
            app.actionItems.getItems().forEach((item) => {
                app.actionItems.removeItem(item);
            });
        }
        children.forEach((child) => {
            app.actionItems.addItem(child);
        });
        return;
    }
    if (app instanceof SegmentedBar) {
        for (const child of children) {
            if (!(child instanceof SegmentedBarItem)) {
                throw Error(`${app} should have only SegmentedBarItem in children, but you have ${child}.`);
            }
        }
        app.items = children;
        return;
    }
    if (app instanceof TabView) {
        for (const child of children) {
            if (!(child instanceof TabViewItem)) {
                throw Error(`${app} should have only TabViewItem in children, but you have ${child}.`);
            }
        }
        app.items = children;
        return;
    }
    if (app instanceof LayoutBase) {
        for (const child of children) {
            if (!(child instanceof View)) {
                throw Error(`${app} should have only View in children, but you have ${child}.`);
            }
        }
        if (clear) {
            app.removeChildren();
        }
        children.forEach((child) => {
            app.addChild(child);
        });
        return;
    }
    if (app instanceof ContentView) {
        if (children.length > 1) {
            throw Error(`${app} should have one child, now it is [${children.join(', ')}].`);
        }
        if (!(children[0] instanceof View)) {
            throw Error(`${app} should have only View as a child, but you have ${children[0]}.`);
        }
        app.content = children[0];
        return;
    }
    if (app instanceof ActionItem) {
        if (children.length > 1) {
            throw Error(`${app} should have one child, now it is [${children.join(', ')}].`);
        }
        if (!(children[0] instanceof View)) {
            throw Error(`${app} should have only View as a child, but you have ${children[0]}.`);
        }
        app.actionView = children[0];
        return;
    }
    if (app instanceof TabViewItem) {
        if (children.length > 1) {
            throw Error(`${app} should have one child, now it is [${children.join(', ')}].`);
        }
        if (!(children[0] instanceof View)) {
            throw Error(`${app} should have only View as a child, but you have ${children[0]}.`);
        }
        app.view = children[0];
    }
}

export { updateChildren };
