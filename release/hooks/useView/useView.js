'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@nativescript/core');
var watchState = require('watch-state');
require('../../utils/index.js');
var Fragment = require('../../utils/Fragment/Fragment.js');

const JSX_ELEMENTS = {
    label: core.Label,
    'root-layout': core.RootLayout,
    'flexbox-layout': core.FlexboxLayout,
    'formatted-string': core.FormattedString,
    switch: core.Switch,
    button: core.Button,
    span: core.Span,
    'stack-layout': core.StackLayout,
    'grid-layout': core.GridLayout,
    'wrap-layout': core.WrapLayout,
    'dock-layout': core.DockLayout,
    'absolute-layout': core.AbsoluteLayout,
    frame: core.Frame,
    page: core.Page,
    'action-bar': core.ActionBar,
    'action-item': core.ActionItem,
    fragment: Fragment.Fragment,
    image: core.Image,
    'navigation-button': core.NavigationButton,
    'activity-indicator': core.ActivityIndicator,
    'date-picker': core.DatePicker,
    'html-view': core.HtmlView,
    'list-picker': core.ListPicker,
    'list-view': core.ListView,
    placeholder: core.Placeholder,
    progress: core.Progress,
    'scroll-view': core.ScrollView,
    'search-bar': core.SearchBar,
    'segmented-bar': core.SegmentedBar,
    'segmented-bar-item': core.SegmentedBarItem,
    slider: core.Slider,
    'tab-view': core.TabView,
    'tab-view-item': core.TabViewItem,
    'text-field': core.TextField,
    'text-view': core.TextView,
    'time-picker': core.TimePicker,
    'web-view': core.WebView,
};
function useView(Target) {
    const view = typeof Target === 'string' ? new JSX_ELEMENTS[Target]() : new Target();
    watchState.onDestroy(() => {
        view.destroyNode();
    });
    return view;
}

exports.JSX_ELEMENTS = JSX_ELEMENTS;
exports.useView = useView;
