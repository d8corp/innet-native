import { FormattedString, Label, LayoutBase, Span, TextBase } from '@nativescript/core'
import innet, { type HandlerPlugin, useApp, useHandler } from 'innet'

import { useParent } from '../../hooks'

export function nativeText (): HandlerPlugin {
  return () => {
    const app = useApp<string>()
    const parent = useParent()
    const handler = useHandler()

    if (typeof parent === 'function') {
      const label = new Label()
      label.text = app
      innet(label, handler, 0, true)
      return
    }

    if (parent instanceof TextBase) {
      parent.text = `${parent.text ?? ''}${app}`
      return
    }

    if (parent instanceof FormattedString) {
      const span = new Span()
      span.text = app
      innet(span, handler, 0, true)
      return
    }

    if (parent instanceof LayoutBase) {
      const label = new Label()
      label.text = app
      innet(label, handler, 0, true)
      return
    }

    throw Error(`You cannot place a text into ${String(parent)}`)
  }
}
