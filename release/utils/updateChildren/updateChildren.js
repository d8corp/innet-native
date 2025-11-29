'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@nativescript/core');
require('../getChildren/index.js');
var getChildren = require('../getChildren/getChildren.js');

function updateChildren(app, clear = false) {
    const children = getChildren.getChildren(app);
    if (!children.length && !clear)
        return;
    if (app instanceof core.Page) {
        let actionBar;
        let content;
        for (let i = 0; i < children.length; i++) {
            if (i > 1) {
                throw Error(`${app} should have only one children View and one ActionBar, but you have ${children[i]} as a third child.`);
            }
            if (i === 1) {
                if (!(children[i] instanceof core.View)) {
                    throw Error(`${app} should have View as the second child, but you have ${children[i]}.`);
                }
                if (actionBar && children[i] instanceof core.ActionBar) {
                    throw Error(`${app} should not have ActionBar as the second child, but you have ${children[i]}.`);
                }
                content = children[i];
                continue;
            }
            if (children[0] instanceof core.ActionBar) {
                actionBar = children[0];
                continue;
            }
            if (!(children[0] instanceof core.View)) {
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
    if (app instanceof core.Frame) {
        for (const child of children) {
            if (!(child instanceof core.Page)) {
                throw Error(`${app} should have only Page in children, but you have ${child}.`);
            }
        }
        const child = children[0];
        app.navigate(Object.assign(Object.assign({}, child.navigation), { create: () => child }));
        return;
    }
    if (app instanceof core.FormattedString) {
        for (const child of children) {
            if (!(child instanceof core.Span)) {
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
    if (app instanceof core.TextBase) {
        if (children.length > 1) {
            throw Error(`${app} should have one child, now it is [${children.join(', ')}].`);
        }
        if (!(children[0] instanceof core.FormattedString)) {
            throw Error(`${app} should have only FormattedString as a child, now it is ${children[0]}.`);
        }
        app.formattedText = children[0];
        return;
    }
    if (app instanceof core.ActionBar) {
        for (const child of children) {
            if (!(child instanceof core.ActionItem)) {
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
    if (app instanceof core.SegmentedBar) {
        for (const child of children) {
            if (!(child instanceof core.SegmentedBarItem)) {
                throw Error(`${app} should have only SegmentedBarItem in children, but you have ${child}.`);
            }
        }
        app.items = children;
        return;
    }
    if (app instanceof core.TabView) {
        for (const child of children) {
            if (!(child instanceof core.TabViewItem)) {
                throw Error(`${app} should have only TabViewItem in children, but you have ${child}.`);
            }
        }
        app.items = children;
        return;
    }
    if (app instanceof core.LayoutBase) {
        for (const child of children) {
            if (!(child instanceof core.View)) {
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
    if (app instanceof core.ContentView) {
        if (children.length > 1) {
            throw Error(`${app} should have one child, now it is [${children.join(', ')}].`);
        }
        if (!(children[0] instanceof core.View)) {
            throw Error(`${app} should have only View as a child, but you have ${children[0]}.`);
        }
        app.content = children[0];
        return;
    }
    if (app instanceof core.ActionItem) {
        if (children.length > 1) {
            throw Error(`${app} should have one child, now it is [${children.join(', ')}].`);
        }
        if (!(children[0] instanceof core.View)) {
            throw Error(`${app} should have only View as a child, but you have ${children[0]}.`);
        }
        app.actionView = children[0];
        return;
    }
    if (app instanceof core.TabViewItem) {
        if (children.length > 1) {
            throw Error(`${app} should have one child, now it is [${children.join(', ')}].`);
        }
        if (!(children[0] instanceof core.View)) {
            throw Error(`${app} should have only View as a child, but you have ${children[0]}.`);
        }
        app.view = children[0];
    }
}

exports.updateChildren = updateChildren;
