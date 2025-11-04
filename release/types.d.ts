import { type Ref } from '@innet/utils';
import { type AbsoluteLayout, type ActionBar, type ActionItem, type ActivityIndicator, type Button, type Color, type ContentView, type CreateViewEventData, type DatePicker, type DockLayout, type EventData, type FlexboxLayout, type FormattedString, type Frame, type GridLayout, type HtmlView, type Image, type ItemEventData, type Label, type ListPicker, type ListView, type NavigationButton, type Observable as NativeObservable, type Page, type Placeholder, type Progress, type PropertyChangeData, type RootLayout, type ScrollEventData, type ScrollView, type SearchBar, type SegmentedBar, type SegmentedBarItem, type Slider, type Span, type StackLayout, type Style as NativeStyle, type Switch, type TabView, type TabViewItem, type TextBase, type TextField, type TextView, type TimePicker, type View, type ViewBase, type WebView, type WrapLayout } from '@nativescript/core';
import { type CoreTypes } from '@nativescript/core/core-types';
import { type ItemsSource } from '@nativescript/core/ui/list-view';
import { type SelectedIndexChangedEventData } from '@nativescript/core/ui/tab-view';
import { type Observable, type Watcher } from 'watch-state';
import { type Fragment } from './utils';
export type WatchProp<T> = T | Watcher<T>;
export type StateProp<T> = WatchProp<T> | Observable<T>;
export type Style = Omit<NativeStyle, keyof NativeObservable | 'view' | 'viewRef' | 'fontInternal' | 'toString' | 'PropertyBag' | 'setScopedCssVariable' | 'setUnscopedCssVariable' | 'removeScopedCssVariable' | 'removeUnscopedCssVariable' | 'getCssVariable' | 'resetScopedCssVariables' | 'resetUnscopedCssVariables'>;
export type ObservableStyle = {
    [K in keyof Style]?: StateProp<Style[K]>;
};
export type NsPropertiesOnly<T> = {
    [K in keyof T]: T[K] extends Function | object ? K extends 'ios' | 'android' ? K : never : K;
}[keyof T];
export type NsColor<T> = T extends Color ? T | string : T;
export type NsSize<T> = T extends CoreTypes.PercentLengthType ? T | string : T;
export type PrivateViewBaseProps = `_${string}` | 'domNode' | 'nativeViewProtected';
export type ViewBaseProps<T extends ViewBase> = {
    ref?: Ref<T>;
    style?: ObservableStyle;
} & {
    [K in Exclude<NsPropertiesOnly<T>, PrivateViewBaseProps>]?: K extends 'ios' | 'android' ? Partial<T[K]> : StateProp<NsSize<NsColor<T[K]>>>;
};
export type ViewProps<T extends View> = ViewBaseProps<T> & {
    onLoaded?: (event: EventData) => void;
    onUnloaded?: (event: EventData) => void;
    onAndroidBackPressed?: (event: EventData) => void;
    onShowingModally?: (event: EventData) => void;
    onShownModally?: (event: EventData) => void;
};
export type TextBaseProps<T extends TextBase> = ViewProps<T> & {
    children?: JSX.Element;
};
export type ContentProps<T extends ContentView> = ViewProps<T> & {
    children?: JSX.Element;
};
export type ChildrenViewProps<T extends View> = ViewProps<T> & {
    children?: JSX.Element;
};
export type SpanProps = ViewBaseProps<Span> & {
    children?: StateProp<string | number>;
    onLinkTap?: (event: EventData) => void;
};
export type ButtonProps = TextBaseProps<Button> & {
    onTap?: (event: EventData) => void;
};
export type FormattedStringProps = ViewBaseProps<FormattedString> & {
    children?: JSX.Element;
};
export type ActionItemProps = ViewBaseProps<ActionItem> & {
    children?: JSX.Element;
    onTap?: (event: EventData) => void;
};
export type NavigationButtonProps = ViewBaseProps<NavigationButton> & {
    children?: JSX.Element;
    onTap?: (event: EventData) => void;
};
export type SegmentedBarProps = ViewProps<SegmentedBar> & {
    children?: JSX.Element;
    onSelectedIndexChanged?: (event: EventData) => void;
};
export type TabViewProps = ViewProps<TabView> & {
    children?: JSX.Element;
    onSelectedIndexChanged?: (event: SelectedIndexChangedEventData) => void;
};
export type TabViewItemProps = ViewBaseProps<TabViewItem> & {
    children?: JSX.Element;
};
export type SliderProps = ViewProps<Slider> & {
    onValueChange?: (event: PropertyChangeData) => void;
};
export type SwitchProps = ViewProps<Switch> & {
    onCheckedChange?: (event: PropertyChangeData) => void;
};
export type TextFieldProps = TextBaseProps<TextField> & {
    onTextChange?: (event: PropertyChangeData) => void;
    onReturnPress?: (event: EventData) => void;
    onFocus?: (event: EventData) => void;
    onBlur?: (event: EventData) => void;
};
export type TextViewProps = TextBaseProps<TextView> & {
    onTextChange?: (event: PropertyChangeData) => void;
    onReturnPress?: (event: EventData) => void;
    onFocus?: (event: EventData) => void;
    onBlur?: (event: EventData) => void;
};
export type SearchBarProps = ViewProps<SearchBar> & {
    onTextChange?: (event: PropertyChangeData) => void;
    onSubmit?: (event: EventData) => void;
    onClear?: (event: EventData) => void;
};
export type TimePickerProps = ViewProps<TimePicker> & {
    onTimeChange?: (event: PropertyChangeData) => void;
};
export type ListViewProps = ViewProps<ListView> & {
    items: any[] | ItemsSource;
    onItemTap?: (event: ItemEventData) => void;
    onItemLoading?: (event: ItemEventData) => void;
    onLoadMoreItems?: (event: EventData) => void;
};
export type ScrollViewProps = ContentProps<ScrollView> & {
    onScroll?: (event: ScrollEventData) => void;
};
export type PlaceholderProps = ViewProps<Placeholder> & {
    onCreatingView?: (event: CreateViewEventData) => void;
};
export type ListPickerProps = ViewProps<ListPicker> & {
    onSelectedIndexChange?: (event: PropertyChangeData) => void;
};
export type RootLayoutProps = ChildrenViewProps<RootLayout>;
export type ProgressProps = ViewProps<Progress>;
export type SegmentedBarItemProps = ViewBaseProps<SegmentedBarItem>;
export type ImageProps = ViewProps<Image>;
export type ActivityIndicatorProps = ViewProps<ActivityIndicator>;
export type DatePickerProps = ViewProps<DatePicker>;
export type HtmlViewProps = ViewProps<HtmlView>;
export type FlexboxLayoutProps = ChildrenViewProps<FlexboxLayout>;
export type PageProps = ChildrenViewProps<Page>;
export type ActionBarProps = ChildrenViewProps<ActionBar>;
export type GridLayoutProps = ChildrenViewProps<GridLayout>;
export type StackLayoutProps = ChildrenViewProps<StackLayout>;
export type WrapLayoutProps = ChildrenViewProps<WrapLayout>;
export type DockLayoutProps = ChildrenViewProps<DockLayout>;
export type AbsoluteLayoutProps = ChildrenViewProps<AbsoluteLayout>;
export type LabelProps = ChildrenViewProps<Label>;
export type FrameProps = ChildrenViewProps<Frame>;
export type FragmentProps = ChildrenViewProps<Fragment>;
export type WebViewProps = ViewProps<WebView> & {
    onLoadStarted?: (event: EventData) => void;
    onLoadFinished?: (event: EventData) => void;
};
export type Parent = ViewBase | Ref<ViewBase>;
