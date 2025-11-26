import innet, { type HandlerPlugin, useApp, useHandler } from 'innet'
import { queueNanotask } from 'queue-nano-task'
import { Watch } from 'watch-state'

import { useChildrenFragment } from '../../hooks'
import { getChildren, updateChildren } from '../../utils'

export function nativeFn (): HandlerPlugin {
  return () => {
    const fn = useApp<Function>()
    const [childrenHandler, fragment] = useChildrenFragment()
    const fragmentChildren = getChildren(fragment)

    innet(fragment, useHandler(), 0, true)

    new Watch(update => {
      const children = fn(update)

      queueNanotask(() => {
        if (update) {
          fragmentChildren.length = 0

          queueNanotask(() => {
            updateChildren(fragment, true)
          }, 1, true)
        }

        innet(children, childrenHandler, 0, true)
      }, 0, true)
    })
  }
}
