import { Span } from '@nativescript/core'
import innet, { type HandlerPlugin, useApp, useHandler } from 'innet'
import { Watch } from 'watch-state'

import { useChildrenHandler, useParent } from '../../hooks'
import { Fragment } from '../../utils'

export function nativeFn (): HandlerPlugin {
  return () => {
    const fn = useApp<Function>()
    const parent = useParent()

    if (parent instanceof Span) {
      new Watch((update) => {
        parent.text = String(fn(update))
      })

      return
    }

    const fragment = new Fragment()
    const childrenHandler = useChildrenHandler(fragment)

    innet(fragment, useHandler())

    new Watch(update => {
      if (update) {
        fragment.removeChildren()
      }

      innet(fn(update), childrenHandler)
    })
  }
}
