import {
  ActionBar,
  ActionItem,
  ContentView,
  FormattedString,
  Frame,
  LayoutBase,
  Page,
  SegmentedBar,
  SegmentedBarItem,
  Span,
  TabView,
  TabViewItem,
  TextBase,
  View,
  type ViewBase,
} from '@nativescript/core'

import { getChildren } from '../getChildren'

export function updateChildren (app: ViewBase, clear = false) {
  const children: any[] = getChildren(app)

  if (!children.length && !clear) return

  if (app instanceof Page) {
    let actionBar: ActionBar | undefined
    let content: View | undefined

    for (let i = 0; i < children.length; i++) {
      if (i > 1) {
        throw Error(`${app} should have only one children View and one ActionBar, but you have ${children[i]} as a third child.`)
      }

      if (i === 1) {
        if (!(children[i] instanceof View)) {
          throw Error(`${app} should have View as the second child, but you have ${children[i]}.`)
        }

        if (actionBar && children[i] instanceof ActionBar) {
          throw Error(`${app} should not have ActionBar as the second child, but you have ${children[i]}.`)
        }

        content = children[i] as View
        continue
      }

      if (children[0] instanceof ActionBar) {
        actionBar = children[0]
        continue
      }

      if (!(children[0] instanceof View)) {
        throw Error(`${app} should have ActionBar or View as the first child, but you have ${children[0]}.`)
      }

      content = children[i] as View
    }

    if (actionBar) {
      app.actionBar = actionBar
    }

    if (content) {
      app.content = content
    }

    return
  }

  if (app instanceof Frame) {
    for (const child of children) {
      if (!(child instanceof Page)) {
        throw Error(`${app} should have only Page in children, but you have ${child}.`)
      }
    }

    const child = children[0] as Page

    app.navigate({
      ...child.navigation,
      create: () => child,
    })

    return
  }

  if (app instanceof FormattedString) {
    for (const child of children) {
      if (!(child instanceof Span)) {
        throw Error(`${app} should have only Span in children, but you have ${child}.`)
      }
    }

    if (clear) {
      app.spans.splice(0, app.spans.length, ...children)
    } else {
      app.spans.push(...children)
    }

    return
  }

  if (app instanceof TextBase) {
    if (children.length > 1) {
      throw Error(`${app} should have one child, now it is [${children.join(', ')}].`)
    }

    if (!(children[0] instanceof FormattedString)) {
      throw Error(`${app} should have only FormattedString as a child, now it is ${children[0]}.`)
    }

    app.formattedText = children[0]
    return
  }

  if (app instanceof ActionBar) {
    for (const child of children) {
      if (!(child instanceof ActionItem)) {
        throw Error(`${app} should have only ActionItem in children, but you have ${child}.`)
      }
    }

    if (clear) {
      app.actionItems.getItems().forEach((item) => {
        app.actionItems.removeItem(item)
      })
    }

    children.forEach((child) => {
      app.actionItems.addItem(child)
    })
    return
  }

  if (app instanceof SegmentedBar) {
    for (const child of children) {
      if (!(child instanceof SegmentedBarItem)) {
        throw Error(`${app} should have only SegmentedBarItem in children, but you have ${child}.`)
      }
    }

    app.items = children
    return
  }

  if (app instanceof TabView) {
    for (const child of children) {
      if (!(child instanceof TabViewItem)) {
        throw Error(`${app} should have only TabViewItem in children, but you have ${child}.`)
      }
    }

    app.items = children
    return
  }

  if (app instanceof LayoutBase) {
    for (const child of children) {
      if (!(child instanceof View)) {
        throw Error(`${app} should have only View in children, but you have ${child}.`)
      }
    }

    if (clear) {
      app.removeChildren()
    }

    children.forEach((child) => {
      app.addChild(child)
    })

    return
  }

  if (app instanceof ContentView) {
    if (children.length > 1) {
      throw Error(`${app} should have one child, now it is [${children.join(', ')}].`)
    }

    if (!(children[0] instanceof View)) {
      throw Error(`${app} should have only View as a child, but you have ${children[0]}.`)
    }

    app.content = children[0]
    return
  }

  if (app instanceof ActionItem) {
    if (children.length > 1) {
      throw Error(`${app} should have one child, now it is [${children.join(', ')}].`)
    }

    if (!(children[0] instanceof View)) {
      throw Error(`${app} should have only View as a child, but you have ${children[0]}.`)
    }

    app.actionView = children[0]
    return
  }

  if (app instanceof TabViewItem) {
    if (children.length > 1) {
      throw Error(`${app} should have one child, now it is [${children.join(', ')}].`)
    }

    if (!(children[0] instanceof View)) {
      throw Error(`${app} should have only View as a child, but you have ${children[0]}.`)
    }

    app.view = children[0]
  }
}
