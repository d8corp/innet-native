import { Label, RootLayout, FlexboxLayout, FormattedString, Switch, Button, Span, StackLayout, GridLayout, WrapLayout, DockLayout, AbsoluteLayout, Frame, ActionBar, ActionItem, Image, NavigationButton, ActivityIndicator, DatePicker, HtmlView, ListPicker, ListView, Placeholder, Progress, ScrollView, SearchBar, SegmentedBar, SegmentedBarItem, Slider, TabView, TabViewItem, TextField, TextView, TimePicker, WebView } from '@nativescript/core';
import './utils/views/index.es6.js';
import { InPage } from './utils/views/InPage/InPage.es6.js';
import { Fragment } from './utils/views/Fragment/Fragment.es6.js';

const JSX_ELEMENTS = {
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
};

export { JSX_ELEMENTS };
