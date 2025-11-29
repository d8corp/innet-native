import type { AnimationDefinition, Frame, NavigationEntry } from '@nativescript/core'
import type { State } from 'watch-state'

import { type CHILDREN, type ENDING_ANIMATE, type PARENT, type PARENT_FRAME, type SUSPENSE } from '../constants'
import type {
  AbsoluteLayoutProps,
  ActionBarProps,
  ActionItemProps,
  ActivityIndicatorProps,
  ButtonProps,
  ContentViewProps,
  DatePickerProps,
  DockLayoutProps,
  EditableTextBaseProps,
  FlexboxLayoutProps,
  FormattedStringProps,
  FrameProps,
  GridLayoutProps,
  HtmlViewProps,
  ImageProps,
  LabelProps,
  ListPickerProps,
  ListViewProps,
  NavigationButtonProps,
  PageProps,
  PlaceholderProps,
  ProgressProps,
  ProxyViewContainerProps,
  RootLayoutProps,
  ScrollViewProps,
  SearchBarProps,
  SegmentedBarItemProps,
  SegmentedBarProps,
  SliderProps,
  SpanProps,
  StackLayoutProps,
  SwitchProps,
  TabViewItemProps,
  TabViewProps,
  TextBaseProps,
  TextFieldProps,
  TextViewProps,
  TimePickerProps,
  WebViewProps,
  WrapLayoutProps,
} from './props'
import type { Parent } from './types'

declare module 'innet' {
  export interface Handler {
    [SUSPENSE]?: State<Set<Promise<any>>>
    [PARENT_FRAME]?: Frame
    [PARENT]?: Parent
  }
}

declare module '@nativescript/core' {
  export interface ViewBase {
    [CHILDREN]?: ViewBase[]
    [ENDING_ANIMATE]?: AnimationDefinition
  }

  export interface Page {
    navigation?: NavigationEntry
    props?: PageProps
  }

  export interface Span { props?: SpanProps }
  export interface RootLayout { props?: RootLayoutProps }
  export interface GridLayout { props?: GridLayoutProps }
  export interface FormattedString { props?: FormattedStringProps }
  export interface TextBase { props?: TextBaseProps }
  export interface Button { props?: ButtonProps }
  export interface FlexboxLayout { props?: FlexboxLayoutProps }
  export interface ContentView { props?: ContentViewProps }
  export interface StackLayout { props?: StackLayoutProps }
  export interface WrapLayout { props?: WrapLayoutProps }
  export interface DockLayout { props?: DockLayoutProps }
  export interface AbsoluteLayout { props?: AbsoluteLayoutProps }
  export interface Label { props?: LabelProps }
  export interface Frame { props?: FrameProps }
  export interface ProxyViewContainer { props?: ProxyViewContainerProps }
  export interface Image { props?: ImageProps }
  export interface Switch { props?: SwitchProps }
  export interface EditableTextBase { props?: EditableTextBaseProps }
  export interface TextField { props?: TextFieldProps }
  export interface TextView { props?: TextViewProps }
  export interface TimePicker { props?: TimePickerProps }
  export interface WebView { props?: WebViewProps }
  export interface Slider { props?: SliderProps }
  export interface Placeholder { props?: PlaceholderProps }
  export interface ActivityIndicator { props?: ActivityIndicatorProps }
  export interface DatePicker { props?: DatePickerProps }
  export interface HtmlView { props?: HtmlViewProps }
  export interface Progress { props?: ProgressProps }
  export interface ScrollView { props?: ScrollViewProps }
  export interface SearchBar { props?: SearchBarProps }
  export interface ActionItem { props?: ActionItemProps }
  export interface NavigationButton { props?: NavigationButtonProps }
  export interface ActionBar { props?: ActionBarProps }
  export interface ListPicker { props?: ListPickerProps }
  export interface ListView { props?: ListViewProps }
  export interface SegmentedBar { props?: SegmentedBarProps }
  export interface SegmentedBarItem { props?: SegmentedBarItemProps }
  export interface TabView { props?: TabViewProps }
  export interface TabViewItem { props?: TabViewItemProps }
}
