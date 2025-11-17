import { type JSXElement } from '@innet/jsx';
import { arraySync } from '@innet/utils';
import { View } from '@nativescript/core';
import { type Observable } from 'watch-state';
import { nativeFn, nativeNode, nativeText, suspense } from '../plugins';
import { type AbsoluteLayoutProps, type ActionBarProps, type ActionItemProps, type ActivityIndicatorProps, type ButtonProps, type DatePickerProps, type DockLayoutProps, type FlexboxLayoutProps, type FormattedStringProps, type FragmentProps, type FrameProps, type GridLayoutProps, type HtmlViewProps, type ImageProps, type LabelProps, type ListPickerProps, type ListViewProps, type NavigationButtonProps, type PageProps, type PlaceholderProps, type ProgressProps, type RootLayoutProps, type ScrollViewProps, type SearchBarProps, type SegmentedBarItemProps, type SegmentedBarProps, type SliderProps, type SpanProps, type StackLayoutProps, type SwitchProps, type TabViewItemProps, type TabViewProps, type TextFieldProps, type TextViewProps, type TimePickerProps, type WebViewProps, type WrapLayoutProps } from '../types';
export declare const arrayPlugins: (typeof arraySync)[];
export declare const JSXPlugins: {};
export declare const objectPlugins: import("innet").Plugin[];
export declare const fnPlugins: (typeof nativeFn)[];
export declare const stringPlugins: (typeof nativeText)[];
export declare const numberPlugins: (typeof nativeText)[];
export declare const nodePlugins: (typeof nativeNode)[];
export declare const promisePlugins: (typeof suspense)[];
export declare const handler: import("innet").Handler;
declare global {
    namespace JSX {
        type Element = PromiseElement | NonPromiseElement;
        type NonPromiseElement = ArrayElement | WatchElement | JSXElement | View | Generator<Element, void, unknown> | AsyncGenerator<Element, void, unknown> | Observable<Element> | boolean | null | number | string | symbol | undefined | void;
        interface ArrayElement extends Array<Element> {
        }
        type WatchElement = (update: boolean) => Element;
        type PromiseElement = Promise<NonPromiseElement>;
        interface ElementChildrenAttribute {
            children: {};
        }
        interface IntrinsicElements {
            span: SpanProps;
            'root-layout': RootLayoutProps;
            'flexbox-layout': FlexboxLayoutProps;
            button: ButtonProps;
            'formatted-string': FormattedStringProps;
            page: PageProps;
            'action-bar': ActionBarProps;
            'action-item': ActionItemProps;
            'grid-layout': GridLayoutProps;
            'stack-layout': StackLayoutProps;
            'wrap-layout': WrapLayoutProps;
            'dock-layout': DockLayoutProps;
            'absolute-layout': AbsoluteLayoutProps;
            label: LabelProps;
            frame: FrameProps;
            fragment: FragmentProps;
            image: ImageProps;
            'navigation-button': NavigationButtonProps;
            'activity-indicator': ActivityIndicatorProps;
            'date-picker': DatePickerProps;
            'html-view': HtmlViewProps;
            'list-picker': ListPickerProps;
            'list-view': ListViewProps;
            placeholder: PlaceholderProps;
            progress: ProgressProps;
            'scroll-view': ScrollViewProps;
            'search-bar': SearchBarProps;
            'segmented-bar': SegmentedBarProps;
            'segmented-bar-item': SegmentedBarItemProps;
            slider: SliderProps;
            switch: SwitchProps;
            'tab-view': TabViewProps;
            'tab-view-item': TabViewItemProps;
            'text-field': TextFieldProps;
            'text-view': TextViewProps;
            'time-picker': TimePickerProps;
            'web-view': WebViewProps;
        }
    }
}
