import { type JSXElement, useChildren } from '@innet/jsx'
import { Frame, View, ViewBase } from '@nativescript/core'
import { use, watchValueToValueWatcher } from '@watch-state/utils'
import innet, { type HandlerPlugin, NEXT, useApp, useHandler } from 'innet'
import { onDestroy, unwatch, Watch } from 'watch-state'

import { ANIMATE_PROPS, PARENT_FRAME } from '../../constants'
import { JSX_ELEMENTS, useView } from '../../hooks'
import { type AnimateProp, type AnimatePropsKey } from '../../types'
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
        if (['children', 'animate'].includes(key)) continue

        if (key === 'ref') {
          if (props.ref) {
            props.ref.value = target
          }

          continue
        }

        const value = props[key]

        if (key === 'style') {
          if (value) {
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
          }

          continue
        }

        if (['ios', 'android'].includes(key)) {
          if (value && (target as any)[key]) {
            Object.assign((target as any)[key], value)
          }

          continue
        }

        if (key.startsWith('on')) {
          if (value) {
            const eventName = key[2].toLowerCase() + key.slice(3)
            target.on(eventName, value)

            onDestroy(() => {
              target.off(eventName, value)
            })
          }

          continue
        }

        const watchValue = watchValueToValueWatcher(value)

        if (typeof watchValue !== 'function') {
          if (watchValue !== undefined) {
            // @ts-expect-error TODO: check it
            target[key] = watchValue
          }

          continue
        }

        let prevValue: any

        new Watch(update => {
          const result = watchValue(update)

          if (!update && result === undefined) return

          if (!update) {
            // @ts-expect-error TODO: fix types
            target[key] = result
            prevValue = result
            return
          }

          if (prevValue === result) return
          prevValue = result
          const animate: AnimateProp | number | boolean = unwatch(() => use(props.animate))

          if (animate && ANIMATE_PROPS.includes(key as AnimatePropsKey) && target instanceof View) {
            if (animate === true) {
              target.animate({ [key]: result, duration: 250 })
              return
            }

            if (typeof animate === 'number') {
              target.animate({ [key]: result, duration: animate })
              return
            }

            if (key in animate) {
              const animateParams = unwatch(() => use(animate[key as AnimatePropsKey]))
              const params = typeof animateParams === 'number' ? { duration: animateParams } : animateParams

              target.animate({ [key]: result, ...params })
              return
            }
          }

          // @ts-expect-error TODO: fix types
          target[key] = result
        })
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
