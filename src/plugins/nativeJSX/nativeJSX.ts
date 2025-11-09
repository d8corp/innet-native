import { type JSXElement, useChildren } from '@innet/jsx'
import { type AnimationDefinition, Frame, View, ViewBase } from '@nativescript/core'
import { use, watchValueToValueWatcher } from '@watch-state/utils'
import innet, { type HandlerPlugin, NEXT, useApp, useHandler } from 'innet'
import SyncTimer from 'sync-timer'
import { onDestroy, unwatch, Watch } from 'watch-state'

import { PARENT_FRAME } from '../../constants'
import { JSX_ELEMENTS, useView } from '../../hooks'
import { type AnimateProp, type AnimatePropsParamsKey } from '../../types'
import { isAnimateParam, isAnimateProp, setParent } from '../../utils'

export function nativeJSX (): HandlerPlugin {
  return () => {
    const { type: Type, props } = useApp<JSXElement>()

    if ((typeof Type !== 'string' || !(Type in JSX_ELEMENTS)) && !(Type?.prototype instanceof ViewBase)) return NEXT

    const children = useChildren()
    const handler = useHandler()
    const target: ViewBase = useView(Type)

    if (props) {
      if (props.startingStyle && target instanceof View) {
        for (const key in props.startingStyle) {
          // @ts-expect-error TODO: fix types
          target[key] = props.startingStyle[key]
        }
      }

      for (const key in props) {
        if (['children', 'animate', 'startingStyle'].includes(key)) continue

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

        const animate = (options: AnimationDefinition) => {
          if (!(target instanceof View)) return

          if (target.isLoaded) {
            target.animate(options)
            return
          }

          target.once('load', () => {
            new SyncTimer(() => {
              target.animate(options)
            })
          })
        }

        const createAnimateOptions = (): undefined | AnimationDefinition => {
          if (!(target instanceof View)) return

          const animate: AnimateProp | number | boolean = unwatch(() => use(props.animate))

          if (!animate || !isAnimateProp(key)) return

          if (animate === true) {
            return { duration: 250, curve: 'ease' }
          }

          if (typeof animate === 'number') {
            return { duration: animate, curve: 'ease' }
          }

          if (key in animate) {
            const animateParams = unwatch(() => use(animate[key as AnimatePropsParamsKey]))
            const params = typeof animateParams === 'number' ? { duration: animateParams } : animateParams

            return { curve: 'ease', ...params }
          }
        }

        const getAnimateOptions = (result: any) => {
          const options = createAnimateOptions()

          if (!options) return

          if (isAnimateParam(key)) {
            if (key === 'scale') {
              options[key] = {
                x: result,
                y: result,
              }
            } else {
              options[key] = result
            }

            return options
          }

          const param = key.slice(0, -1) as 'scale' | 'translate' | 'rotate'
          const axis = key[key.length - 1].toLowerCase() as 'x' | 'y'

          if (param === 'rotate') {
            options.rotate = axis === 'x'
              ? {
                  x: result,
                  y: (target as View).rotateY,
                  z: (target as View).rotate,
                }
              : {
                  x: (target as View).rotateX,
                  y: result,
                  z: (target as View).rotate,
                }
          } else {
            options[param] = axis === 'x'
              ? {
                  x: result,
                  y: (target as View)[`${param}Y`],
                }
              : {
                  x: (target as View)[`${param}X`],
                  y: result,
                }
          }

          return options
        }

        const setValue = (value: any, update?: boolean) => {
          if (target instanceof View) {
            if (update) {
              const options = getAnimateOptions(value)

              if (options) {
                animate(options)
                return
              }
            }

            if (key === 'scale') {
              target.scaleX = value
              target.scaleY = value
              return
            }
          }

          // @ts-expect-error TODO: check it
          target[key] = value
        }

        if (typeof watchValue !== 'function') {
          if (props.startingStyle && key in props.startingStyle && target instanceof View) {
            setValue(watchValue, true)
          } else if (watchValue !== undefined) {
            setValue(watchValue)
          }

          continue
        }

        let prevValue: any = props.startingStyle?.[key]

        new Watch(update => {
          const result = watchValue(update)

          if (!update && result === undefined) return

          if (!update) {
            setValue(result, Boolean(props.startingStyle && key in props.startingStyle && target instanceof View))
            prevValue = result
            return
          }

          if (prevValue === result) return

          setValue(result, update)
          prevValue = result
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
