import { Frame, Page, type ViewBase } from '@nativescript/core'
import { type HandlerPlugin, useApp, useHandler } from 'innet'
import { queueNanotask } from 'queue-nano-task'

import { PARENT_FRAME } from '../../constants'
import { useParent } from '../../hooks'
import { getChildren, updateChildren } from '../../utils'

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
          throw Error(`You can place ${app} only in a Frame`)
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
      } else {
        parentChildren.push(app)
      }
    }

    queueNanotask(() => {
      updateChildren(app)
    }, 1, true)
  }
}
