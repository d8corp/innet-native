import { type JSXElement } from '@innet/jsx'
import { ViewBase } from '@nativescript/core'
import innet, { type HandlerPlugin, NEXT, useApp, useHandler } from 'innet'

import { useNativeChildren, useNativeProps } from '../../hooks'

export function nativeJSX (): HandlerPlugin {
  return () => {
    const { type: Type } = useApp<JSXElement>()

    if (!(Type?.prototype instanceof ViewBase)) return NEXT

    const handler = useHandler()
    const target: ViewBase = new Type()

    useNativeProps(target)
    useNativeChildren(target)

    innet(target, handler, 0, true)
  }
}
