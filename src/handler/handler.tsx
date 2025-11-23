import { jsxComponent, type JSXElement } from '@innet/jsx'
import {
  array,
  arraySync,
  fn,
  nullish,
  number,
  object,
  promise,
  string,
} from '@innet/utils'
import { type View, type ViewBase } from '@nativescript/core'
import { createHandler } from 'innet'
import { type Observable } from 'watch-state'

import {
  native,
  nativeAsync,
  nativeFn,
  nativeIterable,
  nativeJSX,
  nativeNode,
  nativeText,
  state,
  suspense,
  view,
} from '../plugins'

export const arrayPlugins = [
  arraySync,
]

export const objectPlugins = [
  state,
  nativeIterable,
  nativeJSX,
  jsxComponent,
]

export const fnPlugins = [
  nativeFn,
]

export const stringPlugins = [
  nativeText,
]

export const numberPlugins = [
  nativeText,
]

export const nodePlugins = [
  nativeNode,
]

export const promisePlugins = [
  suspense,
  nativeAsync,
]

export const handler = createHandler([
  native,
  nullish([]),
  promise(promisePlugins),
  view(nodePlugins),
  fn(fnPlugins),
  string(stringPlugins),
  number(numberPlugins),
  array(arrayPlugins),
  object(objectPlugins),
])

declare global {
  namespace JSX {
    type Element =
      | PromiseElement
      | NonPromiseElement

    type NonPromiseElement =
      | ArrayElement
      | WatchElement
      | JSXElement
      | View
      | Generator<Element, void, unknown>
      | AsyncGenerator<Element, void, unknown>
      | Observable<Element>
      | boolean
      | null
      | number
      | string
      | symbol
      | undefined
      | void

    interface ArrayElement extends Array<Element> {}

    type WatchElement = (update: boolean) => Element
    type PromiseElement = Promise<NonPromiseElement>

    type ElementClass = ViewBase

    interface ElementAttributesProperty {
      props: {}
    }

    interface ElementChildrenAttribute {
      children: {}
    }
  }
}
