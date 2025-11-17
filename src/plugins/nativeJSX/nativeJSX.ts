import { type JSXElement } from '@innet/jsx'
import { ViewBase } from '@nativescript/core'
import innet, { type HandlerPlugin, NEXT, useApp, useHandler } from 'innet'

import { JSX_ELEMENTS } from '../../elements'
import { useNativeChildren, useNativeProps } from '../../hooks'
import { type ViewTagName } from '../../types'
import { createView } from '../../utils'

export function nativeJSX (): HandlerPlugin {
  return () => {
    const { type: Type } = useApp<JSXElement>()

    if ((typeof Type !== 'string' || !(Type in JSX_ELEMENTS)) && !(Type?.prototype instanceof ViewBase)) return NEXT

    const handler = useHandler()
    const target: ViewBase = typeof Type === 'string' ? createView(Type as ViewTagName) : new Type()

    useNativeProps(target, typeof Type === 'string' ? Type as ViewTagName : undefined)
    useNativeChildren(target)

    innet(target, handler, 1, true)
  }
}
