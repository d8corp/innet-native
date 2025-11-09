import { type JSXElement, useChildren } from '@innet/jsx'
import { type AnimationDefinition, Frame, View, ViewBase } from '@nativescript/core'
import { use, watchValueToValueWatcher } from '@watch-state/utils'
import innet, { type HandlerPlugin, NEXT, useApp, useHandler } from 'innet'
import { onDestroy, unwatch, Watch } from 'watch-state'

import { PARENT_FRAME } from '../../constants'
import { JSX_ELEMENTS, useView } from '../../hooks'
import { type AnimateProp, type AnimatePropsKey } from '../../types'
import { isAnimateParam, isAnimateProp, setParent } from '../../utils'

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

        const setValue = (value: any) => {
          if (key === 'scale' && target instanceof View) {
            target.scaleX = value
            target.scaleY = value
          } else {
            // @ts-expect-error TODO: check it
            target[key] = value
          }
        }

        if (typeof watchValue !== 'function') {
          if (watchValue !== undefined) {
            setValue(watchValue)
          }

          continue
        }

        let prevValue: any

        new Watch(update => {
          const result = watchValue(update)

          if (!update && result === undefined) return

          if (!update) {
            setValue(result)
            prevValue = result
            return
          }

          if (prevValue === result) return

          prevValue = result

          const animate: AnimateProp | number | boolean = unwatch(() => use(props.animate))

          if (animate && isAnimateProp(key) && target instanceof View) {
            const options: AnimationDefinition = {}

            if (isAnimateParam(key)) {
              if (key === 'scale') {
                options[key] = {
                  x: result,
                  y: result,
                }
              } else if (key !== 'translate') {
                options[key] = result
              }
            } else {
              const param = key.slice(0, -1) as 'scale' | 'translate' | 'rotate'
              const axis = key[key.length - 1].toLowerCase() as 'x' | 'y'

              if (param === 'rotate') {
                options.rotate = axis === 'x'
                  ? {
                      x: result,
                      y: target.rotateY,
                      z: target.rotate,
                    }
                  : {
                      x: target.rotateX,
                      y: result,
                      z: target.rotate,
                    }
              } else {
                options[param] = axis === 'x'
                  ? {
                      x: result,
                      y: target[`${param}Y`],
                    }
                  : {
                      x: target[`${param}X`],
                      y: result,
                    }
              }
            }

            if (animate === true) {
              target.animate({ ...options, duration: 250, curve: 'ease' })
              return
            }

            if (typeof animate === 'number') {
              target.animate({ ...options, duration: animate, curve: 'ease' })
              return
            }

            if (key in animate) {
              const animateParams = unwatch(() => use(animate[key as AnimatePropsKey]))
              const params = typeof animateParams === 'number' ? { duration: animateParams } : animateParams

              target.animate({ ...options, curve: 'ease', ...params })
              return
            }
          }

          setValue(result)
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
