import type { Ref } from '@innet/utils'
import type {
  AbsoluteLayout,
  AccessibilityDecrementEventData,
  AccessibilityIncrementEventData,
  ActionBar,
  ActionItem,
  ActivityIndicator,
  Button,
  ContainerView,
  ContentView,
  CreateViewEventData,
  DatePicker,
  DockLayout,
  EditableTextBase,
  EventData,
  FlexboxLayout,
  FormattedString,
  Frame,
  GridLayout,
  HtmlView,
  Image,
  ItemEventData,
  Label,
  LayoutBase,
  ListPicker,
  ListView,
  NavigatedData,
  NavigationButton,
  NavigationData, NavigationEntry,
  Page,
  Placeholder,
  Progress,
  PropertyChangeData,
  ProxyViewContainer,
  RootLayout,
  ScrollEventData,
  ScrollView,
  SearchBar,
  SearchEventData,
  SegmentedBar,
  SegmentedBarItem,
  SelectedIndexChangedEventData,
  ShownModallyData,
  Slider,
  Span,
  StackLayout,
  Switch,
  TabView,
  TabViewItem,
  TextBase,
  TextField,
  TextView,
  TimePicker,
  View,
  ViewBase,
  WebView,
  WrapLayout,
} from '@nativescript/core'
import type { AndroidActionBarSettings } from '@nativescript/core/ui/action-bar'
import type { AndroidFrame, iOSFrame } from '@nativescript/core/ui/frame'
import type { WatchValue } from '@watch-state/utils'

import type {
  AbsoluteLayoutNSProps,
  ActionBarNSProps,
  ActionItemNSProps,
  ActivityIndicatorNSProps,
  ButtonNSProps,
  ContainerViewNSProps,
  ContentViewNSProps,
  DatePickerNSProps,
  DockLayoutNSProps,
  EditableTextBaseNSProps,
  FlexboxLayoutNSProps,
  FormattedStringNSProps,
  FrameNSProps,
  GridLayoutNSProps,
  HtmlViewNSProps,
  ImageNSProps,
  LabelNSProps,
  LayoutBaseNSProps,
  ListPickerNSProps,
  ListViewNSProps,
  NavigationButtonNSProps,
  PageNSProps,
  PlaceholderNSProps,
  ProgressNSProps,
  ProxyViewContainerNSProps,
  RootLayoutNSProps,
  ScrollViewNSProps,
  SearchBarNSProps,
  SegmentedBarItemNSProps,
  SegmentedBarNSProps,
  SliderNSProps,
  SpanNSProps,
  StackLayoutNSProps,
  SwitchNSProps,
  TabViewItemNSProps,
  TabViewNSProps,
  TextBaseNSProps,
  TextFieldNSProps,
  TextViewNSProps,
  TimePickerNSProps,
  ViewBaseNSProps,
  ViewNSProps,
  WebViewNSProps,
  WrapLayoutNSProps,
} from './nsProps'
import type { AnimateProp, AnimateProps, GetNSProps, ObservableStyle } from './types'

export interface ChildrenProps {
  children?: JSX.Element
}

export type ViewBaseProps<T extends ViewBase = ViewBase, P extends ViewBaseNSProps<T> = ViewBaseNSProps<T>> = GetNSProps<P> & {
  ref?: Ref<T>
  style?: ObservableStyle
  ios?: Record<string, any>
  android?: Record<string, any>
  onLoaded?: (event: EventData) => void
  onUnloaded?: (event: EventData) => void
  onCreated?: (event: EventData) => void
  onDisposeNativeView?: (event: EventData) => void
}

export type ViewProps<T extends View = View, P extends ViewNSProps<T> = ViewNSProps<T>> = ViewBaseProps<T, P> & {
  onAndroidBackPressed?: (event: EventData) => void
  onShowingModally?: (event: EventData) => void
  onShownModally?: (event: EventData) => void
  onLayoutChanged?: (event: EventData) => void
  onAccessibilityBlur?: (event: EventData) => void
  onAccessibilityFocus?: (event: EventData) => void
  onAccessibilityFocusChangedEvent?: (event: EventData) => void
  onAndroidOverflowInset?: (event: EventData) => void
  scale?: WatchValue<number>
  animate?: WatchValue<AnimateProp | number | boolean>
  startingStyle?: AnimateProps
  endingStyle?: AnimateProps
}

export type ButtonProps<T extends Button = Button, P extends ButtonNSProps<T> = ButtonNSProps<T>> = TextBaseProps<Button, P> & {
  onTap?: (event: EventData) => void
}

export type PageProps<T extends Page = Page, P extends PageNSProps<T> = PageNSProps<T>> = ContentViewProps<T, P> & {
  navigation?: NavigationEntry
  onNavigatingTo?: (event: NavigatedData) => void
  onNavigatedTo?: (event: NavigatedData) => void
  onNavigatingFrom?: (event: NavigatedData) => void
  onNavigatedFrom?: (event: NavigatedData) => void
  onShowingModally?: (event: ShownModallyData) => void
  onShownModally?: (event: ShownModallyData) => void
}

export type FrameProps<T extends Frame = Frame, P extends FrameNSProps<T> = FrameNSProps<T>> = ContainerViewProps<T, P> & {
  android?: AndroidFrame
  ios?: iOSFrame
  onOptionSelected?: (event: EventData) => void
  onNavigatingTo?: (event: NavigationData) => void
  onNavigatedTo?: (event: NavigationData) => void
}

export type ImageProps<T extends Image = Image, P extends ImageNSProps<T> = ImageNSProps<T>> = ViewProps<T, P> & {
  onIsLoading?: (event: EventData) => void
}

export type SwitchProps<T extends Switch = Switch, P extends SwitchNSProps<T> = SwitchNSProps<T>> = ViewProps<T, P> & {
  onCheckedChange?: (event: PropertyChangeData) => void
}

export type EditableTextBaseProps<T extends EditableTextBase = EditableTextBase, P extends EditableTextBaseNSProps<T> = EditableTextBaseNSProps<T>> = TextBaseProps<T, P> & {
  onBlur?: (event: EventData) => void
  onFocus?: (event: EventData) => void
}

export type TextFieldProps<T extends TextField = TextField, P extends TextFieldNSProps<T> = TextFieldNSProps<T>> = EditableTextBaseProps<T, P> & {
  onTextChange?: (event: PropertyChangeData) => void
  onReturnPress?: (event: EventData) => void
}

export type TextViewProps<T extends TextView = TextView, P extends TextViewNSProps<T> = TextViewNSProps<T>> = EditableTextBaseProps<T, P> & {
  onTextChange?: (event: PropertyChangeData) => void
  onReturnPress?: (event: EventData) => void
}

export type TimePickerProps<T extends TimePicker = TimePicker, P extends TimePickerNSProps<T> = TimePickerNSProps<T>> = ViewProps<T, P> & {
  onTimeChange?: (event: PropertyChangeData) => void
}

export type WebViewProps<T extends WebView = WebView, P extends WebViewNSProps<T> = WebViewNSProps<T>> = ViewProps<T, P> & {
  onLoadStarted?: (event: EventData) => void
  onLoadFinished?: (event: EventData) => void
}

export type SliderProps<T extends Slider = Slider, P extends SliderNSProps<T> = SliderNSProps<T>> = ViewProps<T, P> & {
  onValueChange?: (event: PropertyChangeData) => void
  onAccessibilityDecrement?: (event: AccessibilityDecrementEventData) => void
  onAccessibilityIncrement?: (event: AccessibilityIncrementEventData) => void
}

export type PlaceholderProps<T extends Placeholder = Placeholder, P extends PlaceholderNSProps<T> = PlaceholderNSProps<T>> = ViewProps<T, P> & {
  onCreatingView?: (event: CreateViewEventData) => void
}

export type DatePickerProps<T extends DatePicker = DatePicker, P extends DatePickerNSProps<T> = DatePickerNSProps<T>> = ViewProps<T, P> & {
  onDateChangeEvent?: (event: PropertyChangeData) => void
}

export type ProgressProps<T extends Progress = Progress, P extends ProgressNSProps<T> = ProgressNSProps<T>> = ViewProps<T, P> & {
  onValueChange?: (event: PropertyChangeData) => void
}

export type ScrollViewProps<T extends ScrollView = ScrollView, P extends ScrollViewNSProps<T> = ScrollViewNSProps<T>> = ContentViewProps<T, P> & {
  onScroll?: (event: ScrollEventData) => void
}

export type SearchBarProps<T extends SearchBar = SearchBar, P extends SearchBarNSProps<T> = SearchBarNSProps<T>> = ViewProps<T, P> & {
  onTextChange?: (event: PropertyChangeData) => void
  onSubmit?: (event: EventData) => void
  onClear?: (event: EventData) => void
}

export type ActionItemProps<T extends ActionItem = ActionItem, P extends ActionItemNSProps<T> = ActionItemNSProps<T>> = ViewBaseProps<T, P> & ChildrenProps & {
  onTap?: (event: EventData) => void
}

export type ActionBarProps<T extends ActionBar = ActionBar, P extends ActionBarNSProps<T> = ActionBarNSProps<T>> = ViewProps<T, P> & ChildrenProps & {
  android?: AndroidActionBarSettings
}

export type ListPickerProps<T extends ListPicker = ListPicker, P extends ListPickerNSProps<T> = ListPickerNSProps<T>> = ViewProps<T, P> & {
  onSelectedIndexChange?: (event: PropertyChangeData) => void
}

export type ListViewProps<T extends ListView = ListView, P extends ListViewNSProps<T> = ListViewNSProps<T>> = ViewProps<T, P> & {
  onItemTap?: (event: ItemEventData) => void
  onItemLoading?: (event: ItemEventData) => void
  onLoadMoreItems?: (event: EventData) => void
  onSearchChange?: (event: SearchEventData) => void
}

export type SegmentedBarProps<T extends SegmentedBar = SegmentedBar, P extends SegmentedBarNSProps<T> = SegmentedBarNSProps<T>> = ViewProps<T, P> & ChildrenProps & {
  onSelectedIndexChanged?: (event: SelectedIndexChangedEventData) => void
}

export type TabViewProps<T extends TabView = TabView, P extends TabViewNSProps<T> = TabViewNSProps<T>> = ViewProps<T, P> & ChildrenProps & {
  onSelectedIndexChanged?: (event: SelectedIndexChangedEventData) => void
}

export type SpanProps<T extends Span = Span, P extends SpanNSProps<T> = SpanNSProps<T>> = ViewBaseProps<T, P> & {
  onLinkTap?: (event: EventData) => void
}

export type TabViewItemProps<T extends TabViewItem = TabViewItem, P extends TabViewItemNSProps<T> = TabViewItemNSProps<T>> = ViewBaseProps<T, P> & ChildrenProps
export type ContainerViewProps<T extends ContainerView = ContainerView, P extends ContainerViewNSProps<T> = ContainerViewNSProps<T>> = ViewProps<T, P> & ChildrenProps
export type LayoutBaseProps<T extends LayoutBase = LayoutBase, P extends LayoutBaseNSProps<T> = LayoutBaseNSProps<T>> = ContainerViewProps<T, P>
export type GridLayoutProps<T extends GridLayout = GridLayout, P extends GridLayoutNSProps<T> = GridLayoutNSProps<T>> = LayoutBaseProps<T, P>
export type RootLayoutProps<T extends RootLayout = RootLayout, P extends RootLayoutNSProps<T> = RootLayoutNSProps<T>> = GridLayoutProps<T, P>
export type FormattedStringProps<T extends FormattedString = FormattedString, P extends FormattedStringNSProps<T> = FormattedStringNSProps<T>> = ViewBaseProps<T, P> & ChildrenProps
export type TextBaseProps<T extends TextBase = TextBase, P extends TextBaseNSProps<T> = TextBaseNSProps<T>> = ViewProps<T, P> & ChildrenProps
export type FlexboxLayoutProps<T extends FlexboxLayout = FlexboxLayout, P extends FlexboxLayoutNSProps<T> = FlexboxLayoutNSProps<T>> = LayoutBaseProps<T, P>
export type ContentViewProps<T extends ContentView = ContentView, P extends ContentViewNSProps<T> = ContentViewNSProps<T>> = ContainerViewProps<T, P>
export type StackLayoutProps<T extends StackLayout = StackLayout, P extends StackLayoutNSProps<T> = StackLayoutNSProps<T>> = LayoutBaseProps<T, P>
export type WrapLayoutProps<T extends WrapLayout = WrapLayout, P extends WrapLayoutNSProps<T> = WrapLayoutNSProps<T>> = LayoutBaseProps<T, P>
export type DockLayoutProps<T extends DockLayout = DockLayout, P extends DockLayoutNSProps<T> = DockLayoutNSProps<T>> = LayoutBaseProps<T, P>
export type AbsoluteLayoutProps<T extends AbsoluteLayout = AbsoluteLayout, P extends AbsoluteLayoutNSProps<T> = AbsoluteLayoutNSProps<T>> = LayoutBaseProps<T, P>
export type LabelProps<T extends Label = Label, P extends LabelNSProps<T> = LabelNSProps<T>> = TextBaseProps<T, P>
export type ProxyViewContainerProps<T extends ProxyViewContainer = ProxyViewContainer, P extends ProxyViewContainerNSProps<T> = ProxyViewContainerNSProps<T>> = LayoutBaseProps<T, P>
export type ActivityIndicatorProps<T extends ActivityIndicator = ActivityIndicator, P extends ActivityIndicatorNSProps<T> = ActivityIndicatorNSProps<T>> = ViewProps<T, P>
export type HtmlViewProps<T extends HtmlView = HtmlView, P extends HtmlViewNSProps<T> = HtmlViewNSProps<T>> = ViewProps<T, P>
export type NavigationButtonProps<T extends NavigationButton = NavigationButton, P extends NavigationButtonNSProps<T> = NavigationButtonNSProps<T>> = ActionItemProps<T, P>
export type SegmentedBarItemProps<T extends SegmentedBarItem = SegmentedBarItem, P extends SegmentedBarItemNSProps<T> = SegmentedBarItemNSProps<T>> = ViewBaseProps<T, P>
