import { FormattedString, Label, LayoutBase, Span, TextBase } from '@nativescript/core'
import { type HandlerPlugin, useApp } from 'innet'
import { onDestroy } from 'watch-state'

import { useParent } from '../../hooks'

export function nativeText (): HandlerPlugin {
  return () => {
    const app = useApp<string>()
    const parent = useParent()

    if (parent instanceof TextBase || parent instanceof Span) {
      parent.text = `${parent.text ?? ''}${app}`
    } else if (parent instanceof FormattedString) {
      const span = new Span()
      span.text = app
      parent.spans.push(span)

      onDestroy(() => {
        span.destroyNode()
      })
    } else if (parent instanceof LayoutBase) {
      const label = new Label()
      label.text = app
      parent.addChild(label)

      onDestroy(() => {
        parent.removeChild(label)
        label.destroyNode()
      })
    }
  }
}
