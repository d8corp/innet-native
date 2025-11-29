import type { AnimationDefinition, Frame, NavigationEntry } from '@nativescript/core';
import type { State } from 'watch-state';
import { type CHILDREN, type ENDING_ANIMATE, type PARENT, type PARENT_FRAME, type SUSPENSE } from '../constants';
import type { AbsoluteLayoutProps, ActionBarProps, ActionItemProps, ActivityIndicatorProps, ButtonProps, ContentViewProps, DatePickerProps, DockLayoutProps, EditableTextBaseProps, FlexboxLayoutProps, FormattedStringProps, FrameProps, GridLayoutProps, HtmlViewProps, ImageProps, LabelProps, ListPickerProps, ListViewProps, NavigationButtonProps, PageProps, PlaceholderProps, ProgressProps, ProxyViewContainerProps, RootLayoutProps, ScrollViewProps, SearchBarProps, SegmentedBarItemProps, SegmentedBarProps, SliderProps, SpanProps, SplitViewProps, StackLayoutProps, SwitchProps, TabViewItemProps, TabViewProps, TextBaseProps, TextFieldProps, TextViewProps, TimePickerProps, WebViewProps, WrapLayoutProps } from './props';
import type { Parent } from './types';
declare module 'innet' {
    interface Handler {
        [SUSPENSE]?: State<Set<Promise<any>>>;
        [PARENT_FRAME]?: Frame;
        [PARENT]?: Parent;
    }
}
declare module '@nativescript/core' {
    interface ViewBase {
        [CHILDREN]?: ViewBase[];
        [ENDING_ANIMATE]?: AnimationDefinition;
    }
    interface Page {
        navigation?: NavigationEntry;
        props?: PageProps;
    }
    interface Span {
        props?: SpanProps;
    }
    interface RootLayout {
        props?: RootLayoutProps;
    }
    interface GridLayout {
        props?: GridLayoutProps;
    }
    interface FormattedString {
        props?: FormattedStringProps;
    }
    interface TextBase {
        props?: TextBaseProps;
    }
    interface Button {
        props?: ButtonProps;
    }
    interface FlexboxLayout {
        props?: FlexboxLayoutProps;
    }
    interface ContentView {
        props?: ContentViewProps;
    }
    interface StackLayout {
        props?: StackLayoutProps;
    }
    interface WrapLayout {
        props?: WrapLayoutProps;
    }
    interface DockLayout {
        props?: DockLayoutProps;
    }
    interface AbsoluteLayout {
        props?: AbsoluteLayoutProps;
    }
    interface Label {
        props?: LabelProps;
    }
    interface Frame {
        props?: FrameProps;
    }
    interface ProxyViewContainer {
        props?: ProxyViewContainerProps;
    }
    interface Image {
        props?: ImageProps;
    }
    interface Switch {
        props?: SwitchProps;
    }
    interface EditableTextBase {
        props?: EditableTextBaseProps;
    }
    interface TextField {
        props?: TextFieldProps;
    }
    interface TextView {
        props?: TextViewProps;
    }
    interface TimePicker {
        props?: TimePickerProps;
    }
    interface WebView {
        props?: WebViewProps;
    }
    interface Slider {
        props?: SliderProps;
    }
    interface Placeholder {
        props?: PlaceholderProps;
    }
    interface ActivityIndicator {
        props?: ActivityIndicatorProps;
    }
    interface DatePicker {
        props?: DatePickerProps;
    }
    interface HtmlView {
        props?: HtmlViewProps;
    }
    interface Progress {
        props?: ProgressProps;
    }
    interface ScrollView {
        props?: ScrollViewProps;
    }
    interface SearchBar {
        props?: SearchBarProps;
    }
    interface ActionItem {
        props?: ActionItemProps;
    }
    interface NavigationButton {
        props?: NavigationButtonProps;
    }
    interface ActionBar {
        props?: ActionBarProps;
    }
    interface ListPicker {
        props?: ListPickerProps;
    }
    interface ListView {
        props?: ListViewProps;
    }
    interface SegmentedBar {
        props?: SegmentedBarProps;
    }
    interface SegmentedBarItem {
        props?: SegmentedBarItemProps;
    }
    interface TabView {
        props?: TabViewProps;
    }
    interface TabViewItem {
        props?: TabViewItemProps;
    }
    interface SplitView {
        props?: SplitViewProps;
    }
}
