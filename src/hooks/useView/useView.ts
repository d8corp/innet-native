import {
  AbsoluteLayout, ActionBar, ActionItem, ActivityIndicator, Button, DatePicker, DockLayout,
  FlexboxLayout, FormattedString, Frame, GridLayout, HtmlView, Image,
  Label, ListPicker, ListView, NavigationButton, Placeholder, Progress,
  RootLayout, ScrollView, SearchBar, SegmentedBar, SegmentedBarItem, Slider, Span, StackLayout,
  Switch, TabView, TabViewItem, TextField, TextView, TimePicker, type ViewBase, WebView, WrapLayout,
} from '@nativescript/core'
import { onDestroy } from 'watch-state'

import { Fragment, Page } from '../../utils'

export const JSX_ELEMENTS = {
  label: Label,
  'root-layout': RootLayout,
  'flexbox-layout': FlexboxLayout,
  'formatted-string': FormattedString,
  switch: Switch,
  button: Button,
  span: Span,
  'stack-layout': StackLayout,
  'grid-layout': GridLayout,
  'wrap-layout': WrapLayout,
  'dock-layout': DockLayout,
  'absolute-layout': AbsoluteLayout,
  frame: Frame,
  page: Page,
  'action-bar': ActionBar,
  'action-item': ActionItem,
  fragment: Fragment,
  image: Image,
  'navigation-button': NavigationButton,
  'activity-indicator': ActivityIndicator,
  'date-picker': DatePicker,
  'html-view': HtmlView,
  'list-picker': ListPicker,
  'list-view': ListView,
  placeholder: Placeholder,
  progress: Progress,
  'scroll-view': ScrollView,
  'search-bar': SearchBar,
  'segmented-bar': SegmentedBar,
  'segmented-bar-item': SegmentedBarItem,
  slider: Slider,
  'tab-view': TabView,
  'tab-view-item': TabViewItem,
  'text-field': TextField,
  'text-view': TextView,
  'time-picker': TimePicker,
  'web-view': WebView,
} satisfies Record<string, typeof ViewBase>

export type ViewElement = keyof typeof JSX_ELEMENTS
export type ViewElements = typeof JSX_ELEMENTS

export function useView<T extends typeof ViewBase> (view: T): T['prototype']
export function useView<T extends ViewElement> (tagName: T): InstanceType<ViewElements[T]>
export function useView (Target: ViewElement | (new () => ViewBase)): ViewBase {
  const view = typeof Target === 'string' ? new JSX_ELEMENTS[Target]() : new Target()

  onDestroy(() => {
    view.destroyNode()
  })

  return view
}
