import { FormattedString, Label, LayoutBase, Span, TextBase } from '@nativescript/core'
import { type HandlerPlugin, useApp } from 'innet'

import { useParent } from '../../hooks'

export function nativeText (): HandlerPlugin {
  return () => {
    const app = useApp<string>()
    const parent = useParent()

    if (parent instanceof TextBase) {
      parent.text = `${parent.text ?? ''}${app}`
      return
    }

    if (parent instanceof FormattedString) {
      const span = new Span()
      span.text = app
      parent.spans.push(span)
      return
    }

    if (parent instanceof LayoutBase) {
      const label = new Label()
      label.text = app
      parent.addChild(label)
      return
    }

    throw Error(`You cannot place a text into ${String(parent)}`)
  }
}
