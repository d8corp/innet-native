import { Ref } from '@innet/utils'
import {
  ActionBar,
  ActionItem,
  ContentView,
  FormattedString,
  type Frame,
  LayoutBase,
  SegmentedBar,
  SegmentedBarItem,
  Span,
  TabView,
  TabViewItem,
  TextBase,
  View,
  ViewBase,
} from '@nativescript/core'
import { type HandlerPlugin, useApp, useHandler } from 'innet'

import { PARENT_FRAME } from '../../constants'
import { useParent } from '../../hooks'
import { InPage } from '../../utils'

export function nativeNode (): HandlerPlugin {
  return () => {
    const parent = useParent()
    const app = useApp()

    if (parent instanceof Ref) {
      if (app instanceof View) {
        parent.value = app
        return
      }

      throw Error('Unexpected element used as a root view')
    }

    if (app instanceof InPage) {
      const handler = useHandler()
      const frame: Frame = handler[PARENT_FRAME]

      if (!frame) {
        throw Error('You can place <page> only in a <frame>')
      }

      frame.navigate({
        ...app.navigation,
        create: () => app,
      })

      return
    }

    if (app instanceof Span) {
      if (parent instanceof FormattedString) {
        parent.spans.push(app)
        return
      }

      throw Error(`You can place <span> only in <string>, current parent: ${parent.typeName}`)
    }

    if (app instanceof FormattedString) {
      if (parent instanceof TextBase) {
        parent.formattedText = app
        return
      }

      throw Error(`You can place <string> only in text based elements, current parent: ${parent.typeName}`)
    }

    if (app instanceof ActionBar) {
      if (parent instanceof InPage) {
        parent.actionBar = app
        return
      }

      throw Error(`You can place <action-bar> only in <page>, current parent: ${parent.typeName}`)
    }

    if (app instanceof ActionItem) {
      if (parent instanceof ActionBar) {
        parent.actionItems.addItem(app)
        return
      }

      throw Error(`You can place <action-item> only in <action-bar>, current parent: ${parent.typeName}`)
    }

    if (app instanceof SegmentedBarItem) {
      if (parent instanceof SegmentedBar) {
        if (!parent.items) {
          parent.items = []
        }

        parent.items.push(app)
        return
      }

      throw Error(`You can place <segmented-bar-item> only in <segmented-bar>, current parent: ${parent.typeName}`)
    }

    if (app instanceof TabViewItem) {
      if (parent instanceof TabView) {
        if (parent.items) {
          parent.items = [...parent.items, app]
        } else {
          parent.items = [app]
        }

        return
      }

      throw Error(`You can place <tab-view-item> only in <tab-view>, current parent: ${parent.typeName}`)
    }

    if (app instanceof View) {
      if (parent instanceof ActionBar) {
        parent.titleView = app
        return
      }

      if (parent instanceof LayoutBase) {
        parent.addChild(app)
        return
      }

      if (parent instanceof ContentView) {
        parent.content = app
        return
      }

      if (parent instanceof ActionItem) {
        parent.actionView = app
        return
      }

      if (parent instanceof TabViewItem) {
        parent.view = app
        return
      }

      throw Error(`${app.typeName} cannot be in ${parent.typeName}`)
    }

    if (app instanceof ViewBase) {
      throw Error(`${app.typeName} cannot be in ${parent.typeName}`)
    }

    throw Error(`Unknown element in ${parent.typeName}`)
  }
}
