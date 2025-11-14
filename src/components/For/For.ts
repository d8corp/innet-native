import { EMPTY } from '@innet/jsx'
import { lcs } from '@innet/utils'
import { type View } from '@nativescript/core'
import { type WatchValue, watchValueToValueWatcher } from '@watch-state/utils'
import innet, { extendHandler, type Handler, useHandler, useNewHandler } from 'innet'
import { createEvent, onDestroy, State, unwatch, Watch } from 'watch-state'

import { FOR_INDEX, FOR_VALUE, FOR_WATCHER_KEY } from '../../constants'
import { after, before, Fragment, getParent, setParent } from '../../utils'

export type ForKeyFn<T, V> = (data: T) => V
export type ForKeyStr<T, V> = { [P in keyof T]: T[P] extends V | undefined ? P : never }[keyof T]
export type ForKey<T, V> = ForKeyFn<T, V> | ForKeyStr<T, V>

export function getForKey<T, V> (data: T, key?: ForKey<T, V>): V {
  if (typeof key === 'string') {
    return data[key] as any
  }

  if (typeof key === 'function') {
    return (key as any)(data)
  }

  return data as any
}

type GetType<T extends WatchValue<Iterable<any>>> = T extends WatchValue<Iterable<infer TT>> ? TT : never
type GetKey<T extends WatchValue<Iterable<any>>, V extends ForKey<GetType<T>, any>> = V extends ForKeyStr<GetType<T>, infer VV> ? VV : V extends ForKeyFn<GetType<T>, infer VV> ? VV : never

export interface ForProps<T extends WatchValue<Iterable<any>>, V extends ForKey<GetType<T>, any>> {
  of?: T
  key?: V
  fallback?: JSX.Element
  children?: (
    value: T extends Iterable<GetType<T>> ? GetType<T> : State<GetType<T>>,
    index: T extends Iterable<GetType<T>> ? number : State<number>,
    key: V extends string ? V extends keyof GetType<T> ? GetType<T>[V] : never : GetKey<T, V>
  ) => JSX.Element
}

export function For <T extends WatchValue<Iterable<any>>, V extends ForKey<GetType<T>, any>> ({
  key,
  of: ofPropRaw,
  children,
}: ForProps<T, V>) {
  if (!children || !ofPropRaw) return EMPTY

  const ofProp = watchValueToValueWatcher(ofPropRaw)

  if (typeof ofProp !== 'function') return Array.from(ofProp).map<JSX.Element>((item, index) => children(item, index as any, getForKey(item, key)))

  const childHandler = useNewHandler()
  const forFragment = new Fragment()
  setParent(childHandler, forFragment)

  innet(forFragment, useHandler(), 2)

  let keysList: any[] = []
  const handlersMap = new Map<any, Handler>()

  onDestroy(() => {
    handlersMap.forEach(({ [FOR_WATCHER_KEY]: watcher }) => watcher.destroy())
  })

  new Watch(update => {
    const values = ofProp(update)

    if (!update) {
      let index = 0

      for (const value of values) {
        const valueKey = getForKey(value, key)

        if (handlersMap.has(valueKey)) continue

        keysList.push(valueKey)

        const fragment = new Fragment()
        const deepHandler = extendHandler(childHandler)
        setParent(deepHandler, fragment)
        forFragment.addChild(fragment)
        deepHandler[FOR_VALUE] = new State(value)
        deepHandler[FOR_INDEX] = new State(index++)
        handlersMap.set(valueKey, deepHandler)

        deepHandler[FOR_WATCHER_KEY] = new Watch(() => {
          innet(children(deepHandler[FOR_VALUE], deepHandler[FOR_INDEX], valueKey), deepHandler)
        }, true)
      }

      return
    }

    const oldKeysList = keysList
    const oldKeysSet = new Set(oldKeysList)
    keysList = []

    for (const value of values) {
      keysList.push(getForKey(value, key))
    }

    const keepKeys = new Set(lcs(oldKeysList, keysList))

    let i = 0
    for (const value of values) {
      const index = i++
      const valueKey = keysList[index]

      if (handlersMap.has(valueKey)) {
        const keep = keepKeys.has(valueKey)
        const deepHandler = handlersMap.get(valueKey) as Handler

        unwatch(createEvent(() => {
          deepHandler[FOR_VALUE].value = value
          deepHandler[FOR_INDEX].value = index
        }))

        if (!keep) {
          const keyFragment = getParent<View>(deepHandler)

          if (index) {
            after(getParent(handlersMap.get(keysList[index - 1]) as Handler), keyFragment)
          } else if (oldKeysList.length) {
            before(getParent(handlersMap.get(oldKeysList[0]) as Handler), keyFragment)
          } else {
            forFragment.insertChild(keyFragment, 0)
          }
        }
      } else {
        const keyFragment = new Fragment()
        const keyHandler = Object.create(childHandler)
        setParent(keyHandler, keyFragment)
        keyHandler[FOR_VALUE] = new State(value)
        keyHandler[FOR_INDEX] = new State(index)
        handlersMap.set(valueKey, keyHandler)

        if (index) {
          after(getParent(handlersMap.get(keysList[index - 1]) as Handler), keyFragment)
        } else if (oldKeysList.length) {
          before(getParent(handlersMap.get(oldKeysList[0]) as Handler), keyFragment)
        } else {
          forFragment.insertChild(keyFragment, 0)
        }

        keyHandler[FOR_WATCHER_KEY] = new Watch(() => {
          innet(children(keyHandler[FOR_VALUE], keyHandler[FOR_INDEX], valueKey), keyHandler)
        }, true)
      }

      oldKeysSet.delete(valueKey)
    }

    oldKeysSet.forEach(valueKey => {
      const keyHandler = handlersMap.get(valueKey) as Handler
      handlersMap.delete(valueKey)
      forFragment.removeChild(getParent(keyHandler))
      keyHandler[FOR_WATCHER_KEY].destroy()
    })
  })

  return EMPTY
}
