import {
  jsxComponent,
  type JSXElement,
  jsxPlugins,
} from '@innet/jsx'
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
import { Application, View } from '@nativescript/core'
import innet, { createHandler, useApp } from 'innet'
import { queueNanotask } from 'queue-nano-task'
import { type Observable } from 'watch-state'

import {
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
import {
  type AbsoluteLayoutProps,
  type ActionBarProps,
  type ActionItemProps,
  type ActivityIndicatorProps,
  type ButtonProps,
  type DatePickerProps,
  type DockLayoutProps,
  type FlexboxLayoutProps,
  type FormattedStringProps,
  type FragmentProps,
  type FrameProps,
  type GridLayoutProps,
  type HtmlViewProps,
  type ImageProps,
  type LabelProps,
  type ListPickerProps,
  type ListViewProps,
  type NavigationButtonProps,
  type PageProps,
  type PlaceholderProps,
  type ProgressProps,
  type RootLayoutProps,
  type ScrollViewProps,
  type SearchBarProps,
  type SegmentedBarItemProps,
  type SegmentedBarProps,
  type SliderProps,
  type SpanProps,
  type StackLayoutProps,
  type SwitchProps,
  type TabViewItemProps,
  type TabViewProps,
  type TextFieldProps,
  type TextViewProps,
  type TimePickerProps,
  type WebViewProps,
  type WrapLayoutProps,
} from '../types'
import { setParent } from '../utils'

export const arrayPlugins = [
  arraySync,
]

export const JSXPlugins = {}

export const objectPlugins = [
  state,
  nativeIterable,
  nativeJSX,
  jsxComponent,
  jsxPlugins(JSXPlugins),
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

const handlerInner = createHandler([
  nullish([]),
  promise(promisePlugins),
  view(nodePlugins),
  fn(fnPlugins),
  string(stringPlugins),
  number(numberPlugins),
  array(arrayPlugins),
  object(objectPlugins),
])

export const handler = createHandler([
  () => () => {
    const app = useApp()
    const handler = Object.create(handlerInner)

    setParent(handler, (view) => {
      if (!(view instanceof View)) {
        throw Error(`Unknown view ${String(view)} used as root`)
      }

      queueNanotask(() => {
        Application.run({ create: () => view })
      }, 1)
    })

    innet(app, handler)
  },
])

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
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

    interface ElementChildrenAttribute {
      // eslint-disable-next-line @typescript-eslint/ban-types
      children: {}
    }

    interface IntrinsicElements {
      span: SpanProps
      'root-layout': RootLayoutProps
      'flexbox-layout': FlexboxLayoutProps
      button: ButtonProps
      'formatted-string': FormattedStringProps
      page: PageProps
      'action-bar': ActionBarProps
      'action-item': ActionItemProps
      'grid-layout': GridLayoutProps
      'stack-layout': StackLayoutProps
      'wrap-layout': WrapLayoutProps
      'dock-layout': DockLayoutProps
      'absolute-layout': AbsoluteLayoutProps
      label: LabelProps
      frame: FrameProps
      fragment: FragmentProps
      image: ImageProps
      'navigation-button': NavigationButtonProps
      'activity-indicator': ActivityIndicatorProps
      'date-picker': DatePickerProps
      'html-view': HtmlViewProps
      'list-picker': ListPickerProps
      'list-view': ListViewProps
      placeholder: PlaceholderProps
      progress: ProgressProps
      'scroll-view': ScrollViewProps
      'search-bar': SearchBarProps
      'segmented-bar': SegmentedBarProps
      'segmented-bar-item': SegmentedBarItemProps
      slider: SliderProps
      switch: SwitchProps
      'tab-view': TabViewProps
      'tab-view-item': TabViewItemProps
      'text-field': TextFieldProps
      'text-view': TextViewProps
      'time-picker': TimePickerProps
      'web-view': WebViewProps
    }
  }
}
