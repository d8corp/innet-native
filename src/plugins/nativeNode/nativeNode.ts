import {
  ActionBar,
  ActionItem,
  ContentView,
  FormattedString,
  Frame,
  LayoutBase, Page,
  SegmentedBar, SegmentedBarItem,
  Span,
  TabView,
  TabViewItem,
  TextBase,
  type ViewBase,
} from '@nativescript/core'
import { type HandlerPlugin, useApp, useHandler } from 'innet'
import { queueNanotask } from 'queue-nano-task'

import { PARENT_FRAME } from '../../constants'
import { useParent } from '../../hooks'
import { getChildren, updateChildren } from '../../utils'

const viewParents = ([
  [Span, FormattedString],
  [FormattedString, TextBase],
  [ActionItem, ActionBar],
  [SegmentedBarItem, SegmentedBar],
  [TabViewItem, TabView],
]) as const satisfies readonly [abstract new () => ViewBase, abstract new () => ViewBase][]

export function nativeNode (): HandlerPlugin {
  return () => {
    const app = useApp<ViewBase>()
    const parent = useParent()

    if (Array.isArray(parent)) {
      parent.push(app)
    } else {
      const parentChildren = getChildren(parent)

      if (app instanceof Page) {
        const handler = useHandler()
        const parentFrame = handler[PARENT_FRAME]

        if (!parentFrame) {
          throw Error('You can place <page> only in a <frame>')
        }

        if (parent instanceof Frame) {
          parentChildren.push(app)
        } else {
          queueNanotask(() => {
            parentFrame.navigate({
              ...app.navigation,
              create: () => app,
            })
          }, 1, true)
        }
      } else if (parent instanceof ContentView || parent instanceof LayoutBase || parent instanceof TabViewItem) {
        parentChildren.push(app)
      } else {
        const append = viewParents.some(([appConstructor, parentConstructor]) => {
          if (app instanceof appConstructor && parent instanceof parentConstructor) {
            parentChildren.push(app)
            return true
          }

          return false
        })

        if (!append) {
          throw Error(`You cannot place ${app} into ${parent}`)
        }
      }
    }

    queueNanotask(() => {
      updateChildren(app)
    }, 1, true)
  }
}
