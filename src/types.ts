import { type Ref } from '@innet/utils'
import {
  type AbsoluteLayout,
  type ActionBar,
  type ActionItem,
  type ActivityIndicator,
  type AnimationDefinition,
  type Button,
  type Color,
  type ContentView,
  type CoreTypes,
  type CreateViewEventData,
  type DatePicker,
  type DockLayout,
  type EventData,
  type FlexboxLayout,
  type FormattedString,
  type Frame,
  type GridLayout,
  type HtmlView,
  type Image,
  type ItemEventData,
  type ItemsSource,
  type Label,
  type ListPicker,
  type ListView,
  type NavigationButton, type NavigationEntry,
  type Observable as NativeObservable, type Page,
  type Placeholder,
  type Progress,
  type PropertyChangeData, type ProxyViewContainer,
  type RootLayout,
  type ScrollEventData,
  type ScrollView,
  type SearchBar,
  type SegmentedBar,
  type SegmentedBarItem,
  type SelectedIndexChangedEventData,
  type Slider,
  type Span,
  type StackLayout,
  type Style as NativeStyle,
  type Switch,
  type TabView,
  type TabViewItem,
  type TextBase,
  type TextField,
  type TextView,
  type TimePicker,
  type View,
  type ViewBase,
  type WebView,
  type WrapLayout,
} from '@nativescript/core'
import { type ContainerView } from '@nativescript/core/ui/core/view'
import { type ShownModallyData } from '@nativescript/core/ui/core/view/view-interfaces'
import { type EditableTextBase } from '@nativescript/core/ui/editable-text-base'
import { type AndroidFrame, type iOSFrame } from '@nativescript/core/ui/frame'
import type { NavigationData } from '@nativescript/core/ui/frame/frame-interfaces'
import { type LayoutBase } from '@nativescript/core/ui/layouts/layout-base'
import { type NavigatedData } from '@nativescript/core/ui/page'
import { type WatchValue } from '@watch-state/utils'
import { type State } from 'watch-state'

import {
  type ANIMATE_PARAMS,
  type ANIMATE_PROPS,
  type CHILDREN,
  type ENDING_ANIMATE, type PARENT,
  type PARENT_FRAME,
  type SUSPENSE,
} from './constants'
import { type JSX_ELEMENTS } from './elements'
import {
  type AbsoluteLayoutNSProps,
  type ButtonNSProps,
  type ContainerViewNSProps,
  type ContentViewNSProps,
  type DockLayoutNSProps, type EditableTextBaseNSProps,
  type FlexboxLayoutNSProps,
  type FormattedStringNSProps, type FrameNSProps,
  type GridLayoutNSProps, type ImageNSProps, type LabelNSProps,
  type LayoutBaseNSProps,
  type PageNSProps, type ProxyViewContainerNSProps,
  type RootLayoutNSProps,
  type SpanNSProps,
  type StackLayoutNSProps, type SwitchNSProps,
  type TextBaseNSProps, type TextFieldNSProps, type TextViewNSProps,
  type ViewBaseNSProps,
  type ViewNSProps,
  type WrapLayoutNSProps,
} from './nsProps'
import { type Fragment } from './utils'

export type Style = Omit<
NativeStyle,
keyof NativeObservable
| 'view'
| 'viewRef'
| 'fontInternal'
| 'toString'
| 'PropertyBag'
| 'setScopedCssVariable'
| 'setUnscopedCssVariable'
| 'removeScopedCssVariable'
| 'removeUnscopedCssVariable'
| 'getCssVariable'
| 'resetScopedCssVariables'
| 'resetUnscopedCssVariables'
>

export type ObservableStyle = { [K in keyof Style]?: WatchValue<Style[K]> }

export type NSProp<T> = T extends Color | CoreTypes.PercentLengthType ? T | string : T extends View ? T | JSX.Element : T

export type AnimatePropsParamsKey = typeof ANIMATE_PARAMS[number]
export type AnimatePropsKey = typeof ANIMATE_PROPS[number]
export type AnimateParamsKey = Exclude<keyof AnimationDefinition, AnimatePropsParamsKey | 'target'>
export type AnimateParams = { [K in AnimateParamsKey]?: AnimationDefinition[K] }
export type AnimateProp = Partial<Record<AnimatePropsParamsKey, WatchValue<AnimateParams | number>>>
export type AnimateProps = { [K in AnimatePropsKey]?: WatchValue<K extends keyof View ? View[K] : number> }

export type GetNSProps<T extends object> = { [K in keyof T]?: WatchValue<NSProp<T[K]>> }

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
  onNavigatingTo?: (event: NavigatedData) => void
  onNavigatedTo?: (event: NavigatedData) => void
  onNavigatingFrom?: (event: NavigatedData) => void
  onNavigatedFrom?: (event: NavigatedData) => void
  onShowingModally?: (event: ShownModallyData) => void
  onShownModally?: (event: ShownModallyData) => void
}

export type FrameProps<T extends Frame = Frame, P extends FrameNSProps<T> = FrameNSProps<T>> = ContainerViewProps<T, P> & {
  android: AndroidFrame
  ios: iOSFrame
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

export type SpanProps<T extends Span = Span, P extends SpanNSProps<T> = SpanNSProps<T>> = ViewBaseProps<T, P> & {
  onLinkTap?: (event: EventData) => void
}

export type ContentProps<T extends ContentView> = ViewProps<T> & {
  children?: JSX.Element
}

export type ChildrenViewProps<T extends View> = ViewProps<T> & {
  children?: JSX.Element
}

export type ActionItemProps = ViewBaseProps<ActionItem> & {
  children?: JSX.Element
  onTap?: (event: EventData) => void
}

export type NavigationButtonProps = ViewBaseProps<NavigationButton> & {
  children?: JSX.Element
  onTap?: (event: EventData) => void
}

export type SegmentedBarProps = ViewProps<SegmentedBar> & {
  children?: JSX.Element
  onSelectedIndexChanged?: (event: EventData) => void
}

export type TabViewProps = ViewProps<TabView> & {
  children?: JSX.Element
  onSelectedIndexChanged?: (event: SelectedIndexChangedEventData) => void
}

export type TabViewItemProps = ViewBaseProps<TabViewItem> & {
  children?: JSX.Element
}

export type SliderProps = ViewProps<Slider> & {
  onValueChange?: (event: PropertyChangeData) => void
}

export type SearchBarProps = ViewProps<SearchBar> & {
  onTextChange?: (event: PropertyChangeData) => void
  onSubmit?: (event: EventData) => void
  onClear?: (event: EventData) => void
}

export type TimePickerProps = ViewProps<TimePicker> & {
  onTimeChange?: (event: PropertyChangeData) => void
}

export type ListViewProps = ViewProps<ListView> & {
  items: any[] | ItemsSource
  onItemTap?: (event: ItemEventData) => void
  onItemLoading?: (event: ItemEventData) => void
  onLoadMoreItems?: (event: EventData) => void
}

export type ScrollViewProps = ContentProps<ScrollView> & {
  onScroll?: (event: ScrollEventData) => void
}

export type PlaceholderProps = ViewProps<Placeholder> & {
  onCreatingView?: (event: CreateViewEventData) => void
}

export type ListPickerProps = ViewProps<ListPicker> & {
  onSelectedIndexChange?: (event: PropertyChangeData) => void
}

export type ProgressProps = ViewProps<Progress>
export type SegmentedBarItemProps = ViewBaseProps<SegmentedBarItem>
export type ActivityIndicatorProps = ViewProps<ActivityIndicator>
export type DatePickerProps = ViewProps<DatePicker>
export type HtmlViewProps = ViewProps<HtmlView>
export type ActionBarProps = ChildrenViewProps<ActionBar>
export type FragmentProps = ChildrenViewProps<Fragment>
export type WebViewProps = ViewProps<WebView> & {
  onLoadStarted?: (event: EventData) => void
  onLoadFinished?: (event: EventData) => void
}

export type Parent<T extends ViewBase = ViewBase> = T | T[]

export type ViewProp<T extends ViewTagName> = {
  [K in keyof InstanceType<typeof JSX_ELEMENTS[T]>]: InstanceType<typeof JSX_ELEMENTS[T]>[K] extends ViewBase ? K : never
}[keyof InstanceType<typeof JSX_ELEMENTS[T]>]

export type ViewTagName = keyof typeof JSX_ELEMENTS
export type TagNameView = typeof JSX_ELEMENTS

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

  export interface Span {
    props?: SpanProps
  }

  export interface RootLayout {
    props?: RootLayoutProps
  }

  export interface GridLayout {
    props?: GridLayoutProps
  }

  export interface FormattedString {
    props?: FormattedStringProps
  }

  export interface TextBase {
    props?: TextBaseProps
  }

  export interface Button {
    props?: ButtonProps
  }

  export interface FlexboxLayout {
    props?: FlexboxLayoutProps
  }

  export interface ContentView {
    props?: ContentViewProps
  }

  export interface Page {
    navigation?: NavigationEntry
    props?: PageProps
  }

  export interface StackLayout {
    props?: StackLayoutProps
  }

  export interface WrapLayout {
    props?: WrapLayoutProps
  }

  export interface DockLayout {
    props?: DockLayoutProps
  }

  export interface AbsoluteLayout {
    props?: AbsoluteLayoutProps
  }

  export interface Label {
    props?: LabelProps
  }

  export interface Frame {
    props?: FrameProps
  }

  export interface ProxyViewContainer {
    props?: ProxyViewContainerProps
  }

  export interface Image {
    props?: ImageProps
  }

  export interface Switch {
    props?: SwitchProps
  }

  export interface EditableTextBase {
    props?: EditableTextBaseProps
  }

  export interface TextField {
    props?: TextFieldProps
  }

  export interface TextView {
    props?: TextViewProps
  }
}
