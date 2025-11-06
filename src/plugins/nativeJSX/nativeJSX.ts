import { type JSXElement, useChildren } from '@innet/jsx'
import {
  Frame,
  ViewBase,
} from '@nativescript/core'
import { watchValueToValueWatcher } from '@watch-state/utils'
import innet, { type HandlerPlugin, NEXT, useApp, useHandler } from 'innet'
import { onDestroy, Watch } from 'watch-state'

import { PARENT_FRAME } from '../../constants'
import { JSX_ELEMENTS, useView } from '../../hooks'
import { setParent } from '../../utils'

export function nativeJSX (): HandlerPlugin {
  return () => {
    const { type: Type, props } = useApp<JSXElement>()

    if ((typeof Type !== 'string' || !(Type in JSX_ELEMENTS)) && !(Type?.prototype instanceof ViewBase)) return NEXT

    const children = useChildren()
    const handler = useHandler()
    const target: ViewBase = useView(Type)

    if (props) {
      for (const key in props) {
        if (key === 'children') continue

        if (key === 'ref') {
          if (props.ref) {
            props.ref.value = target
          }

          continue
        }

        const value = props[key]

        if (key === 'style') {
          for (const property in value) {
            const rawValue = watchValueToValueWatcher(value[property])

            if (typeof rawValue === 'function') {
              new Watch(update => {
                target.style.setProperty(property, rawValue(update))
              })
            } else {
              target.style.setProperty(property, rawValue)
            }
          }
          continue
        }

        if (['ios', 'android'].includes(key)) {
          if ((target as any)[key]) {
            Object.assign((target as any)[key], value)
          }

          continue
        }

        if (key.startsWith('on')) {
          const eventName = key[2].toLowerCase() + key.slice(3)
          target.on(eventName, value)

          onDestroy(() => {
            target.off(eventName, value)
          })

          continue
        }

        const watchValue = watchValueToValueWatcher(value)

        if (typeof watchValue === 'function') {
          new Watch(update => {
            const result = watchValue(update)
            // @ts-expect-error TODO: fix types
            if (target[key] !== result) {
              // @ts-expect-error TODO: fix types
              target[key] = result
            }
          })
        } else {
          // @ts-expect-error TODO: check it
          target[key] = watchValue
        }
      }
    }

    if (children) {
      const childrenHandler = Object.create(handler)

      if (target instanceof Frame) {
        childrenHandler[PARENT_FRAME] = target
      }

      setParent(childrenHandler, target)
      innet(children, childrenHandler)
    }

    innet(target, handler)
  }
}
