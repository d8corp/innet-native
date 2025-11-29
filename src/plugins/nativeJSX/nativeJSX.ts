import { type JSXElement } from '@innet/jsx'
import { Page, ViewBase } from '@nativescript/core'
import innet, { type HandlerPlugin, NEXT, useApp, useHandler } from 'innet'
import { Watch } from 'watch-state'

import { useNativeChildren, useNativeProps } from '../../hooks'

export function nativeJSX (): HandlerPlugin {
  return () => {
    const { type: Type } = useApp<JSXElement>()

    if (!(Type?.prototype instanceof ViewBase)) return NEXT

    const handler = useHandler()
    const target: ViewBase = new Type()

    if (target instanceof Page) {
      const watcher = new Watch(() => {
        useNativeProps(target)
        useNativeChildren(target)
      }, true)

      target.once('disposeNativeView', () => {
        watcher.destroy()
      })
    } else {
      useNativeProps(target)
      useNativeChildren(target)
    }

    innet(target, handler, 0, true)
  }
}
