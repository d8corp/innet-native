import innet, { type HandlerPlugin, useApp, useHandler } from 'innet'
import { Watch } from 'watch-state'

import { useChildrenHandler } from '../../hooks'
import { Fragment } from '../../utils'

export function nativeFn (): HandlerPlugin {
  return () => {
    const fn = useApp<Function>()

    const fragment = new Fragment()
    const childrenHandler = useChildrenHandler(fragment)

    innet(fragment, useHandler(), 2)

    new Watch(update => {
      if (update) {
        fragment.removeChildren()
      }

      innet(fn(update), childrenHandler)
    })
  }
}
