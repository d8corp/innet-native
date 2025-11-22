import { Application, View, type ViewBase } from '@nativescript/core'
import innet, { type HandlerPlugin, PLUGINS, useApp, useNewHandler } from 'innet'
import { queueNanotask } from 'queue-nano-task'

import { PARENT } from '../../constants'

export function native (): HandlerPlugin {
  const nativePlugin = () => {
    const app = useApp()
    const handler = useNewHandler()

    const children: ViewBase[] = handler[PARENT] = []
    handler[PLUGINS] = handler[PLUGINS].filter((plugin) => plugin !== nativePlugin)
    innet(app, handler)

    queueNanotask(() => {
      if (!children.length) {
        throw Error('No content provided as a root element')
      }

      if (children.length > 1) {
        throw Error('Many content provided as a root element')
      }

      const view = children[0]

      if (!(view instanceof View)) {
        throw Error(`Unknown view ${String(view)} used as root`)
      }

      Application.run({ create: () => view })
    }, 1)
  }

  return nativePlugin
}
