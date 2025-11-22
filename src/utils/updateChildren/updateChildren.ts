import {
  ActionBar, ActionItem, ContentView,
  FormattedString,
  Frame,
  LayoutBase, type Page,
  SegmentedBar,
  TabView, TabViewItem,
  TextBase,
  type ViewBase,
} from '@nativescript/core'

import { getChildren } from '../getChildren'

export function updateChildren (app: ViewBase, clear = false) {
  const children: any[] = getChildren(app)

  if (!children.length && !clear) return

  if (app instanceof Frame) {
    const child = children[0] as Page

    app.navigate({
      ...child.navigation,
      create: () => child,
    })

    return
  }

  if (app instanceof FormattedString) {
    if (clear) {
      app.spans.splice(0, app.spans.length, ...children)
    } else {
      app.spans.push(...children)
    }

    return
  }

  if (app instanceof TextBase) {
    app.formattedText = children[0]
    return
  }

  if (app instanceof ActionBar) {
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

  if (app instanceof SegmentedBar || app instanceof TabView) {
    app.items = children
    return
  }

  if (app instanceof LayoutBase) {
    if (clear) {
      app.removeChildren()
    }

    children.forEach((child) => {
      app.addChild(child)
    })
    return
  }

  if (app instanceof ContentView) {
    app.content = children[0]
    return
  }

  if (app instanceof ActionItem) {
    app.actionView = children[0]
    return
  }

  if (app instanceof TabViewItem) {
    app.view = children[0]
  }
}
