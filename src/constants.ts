import type { AnimationDefinition, ViewBase } from '@nativescript/core'
import {
  AbsoluteLayout, ActionBar, ActionItem, ActivityIndicator, Button, DatePicker, DockLayout,
  FlexboxLayout, FormattedString, Frame, GridLayout, HtmlView, Image,
  Label, ListPicker, ListView, NavigationButton, Placeholder, Progress,
  RootLayout, ScrollView, SearchBar, SegmentedBar, SegmentedBarItem, Slider, Span, StackLayout,
  Switch, TabView, TabViewItem, TextField, TextView, TimePicker, WebView, WrapLayout,
} from '@nativescript/core'

import { Fragment, InPage } from './utils/views'

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
  page: InPage,
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

export const PARENT = Symbol('parent') as unknown as string
export const FOR_VALUE = Symbol('FOR_VALUE') as unknown as string
export const FOR_INDEX = Symbol('FOR_INDEX') as unknown as string
export const FOR_WATCHER_KEY = Symbol('FOR_WATCHER_KEY') as unknown as string
export const PARENT_FRAME = Symbol('PARENT_FRAME') as unknown as string
export const PARENT_NAVIGATE = Symbol('PARENT_NAVIGATE') as unknown as string
export const ENDING_ANIMATE = Symbol('ENDING_ANIMATE')

export const ANIMATE_PARAMS_PROPS = [
  'height',
  'width',
  'opacity',
  'backgroundColor',
  'rotate',
  'scale',
] as const satisfies Array<keyof AnimationDefinition>

export const ANIMATE_PARAMS = [
  ...ANIMATE_PARAMS_PROPS,
  'translate',
] as const satisfies Array<keyof AnimationDefinition>

export const ANIMATE_PROPS = [
  ...ANIMATE_PARAMS_PROPS,
  'scaleX',
  'scaleY',
  'translateX',
  'translateY',
  'rotateX',
  'rotateY',
] as const
