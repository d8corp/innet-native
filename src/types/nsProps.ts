import {
  type AbsoluteLayout, type ActionBar, type ActionItem,
  type ActivityIndicator,
  type Button,
  type DatePicker,
  type DockLayout,
  type EditableTextBase,
  type FlexboxLayout,
  type FormattedString,
  type Frame,
  type HtmlView,
  type Image,
  type Label, type ListPicker, type ListView, type NavigationButton,
  type Page,
  type Placeholder, type Progress,
  type ProxyViewContainer,
  type RootLayout, type ScrollView, type SearchBar, type SegmentedBar, type SegmentedBarItem,
  type Slider,
  type Span,
  type StackLayout,
  type Switch, type TabViewItem,
  type TextField,
  type TimePicker,
  type View,
  type ViewBase,
  type WebView,
  type WrapLayout,
} from '@nativescript/core'
import { type ContentView } from '@nativescript/core/ui/content-view'
import { type ContainerView } from '@nativescript/core/ui/core/view'
import { type GridLayout } from '@nativescript/core/ui/layouts/grid-layout'
import { type LayoutBase } from '@nativescript/core/ui/layouts/layout-base'
import { type TabView } from '@nativescript/core/ui/tab-view'
import { type TextBase } from '@nativescript/core/ui/text-base'
import { type TextView } from '@nativescript/core/ui/text-view'

export type ViewBaseNSProps<T extends ViewBase = ViewBase, R extends keyof T = never> = Pick<
T,
| 'id'
| 'className'
| 'hidden'
| 'sharedTransitionTag'
| 'sharedTransitionIgnore'
| 'defaultVisualState'
| 'left'
| 'top'
| 'dock'
| 'row'
| 'col'
| 'column'
| 'rowSpan'
| 'colSpan'
| 'columnSpan'
| 'order'
| 'flexGrow'
| 'flexShrink'
| 'flexWrapBefore'
| 'alignSelf'
| 'reusable'
| R
>

export type ViewNSProps<T extends View = View, R extends keyof T = never> = ViewBaseNSProps<
T,
| 'borderColor'
| 'borderTopColor'
| 'borderRightColor'
| 'borderBottomColor'
| 'borderLeftColor'
| 'borderWidth'
| 'borderTopWidth'
| 'borderRightWidth'
| 'borderBottomWidth'
| 'borderLeftWidth'
| 'borderRadius'
| 'borderTopLeftRadius'
| 'borderTopRightRadius'
| 'borderBottomRightRadius'
| 'borderBottomLeftRadius'
| 'color'
| 'accessibilityHidden'
| 'accessibilityIdentifier'
| 'accessibilityRole'
| 'accessibilityState'
| 'accessibilityLabel'
| 'accessibilityValue'
| 'accessibilityHint'
| 'accessibilityLanguage'
| 'accessibilityMediaSession'
| 'accessibilityIgnoresInvertColors'
| 'iosAccessibilityAdjustsFontSize'
| 'iosAccessibilityMinFontScale'
| 'iosAccessibilityMaxFontScale'
| 'automationText'
| 'androidElevation'
| 'androidDynamicElevationOffset'
| 'background'
| 'backgroundColor'
| 'backgroundImage'
| 'boxShadow'
| 'minWidth'
| 'minHeight'
| 'width'
| 'height'
| 'margin'
| 'marginLeft'
| 'marginTop'
| 'marginRight'
| 'marginBottom'
| 'horizontalAlignment'
| 'verticalAlignment'
| 'visibility'
| 'opacity'
| 'rotate'
| 'rotateX'
| 'rotateY'
| 'perspective'
| 'translateX'
| 'translateY'
| 'scaleX'
| 'scaleY'
| 'originX'
| 'originY'
| 'flexFlow'
| 'flex'
| 'isEnabled'
| 'isUserInteractionEnabled'
| 'iosOverflowSafeArea'
| 'iosOverflowSafeAreaEnabled'
| 'iosIgnoreSafeArea'
| 'visionIgnoreHoverStyle'
| 'visionHoverStyle'
| 'testID'
| 'touchAnimation'
| 'ignoreTouchAnimation'
| 'touchDelay'
| R
>

export type ContainerViewNSProps<T extends ContainerView, R extends keyof T = never> = ViewNSProps<
T,
| 'iosOverflowSafeArea'
| R
>

export type LayoutBaseNSProps<T extends LayoutBase, R extends keyof T = never> = ContainerViewNSProps<
T,
| 'padding'
| 'paddingBottom'
| 'paddingLeft'
| 'paddingRight'
| 'paddingTop'
| 'clipToBounds'
| 'isPassThroughParentEnabled'
| R
>

export type GridLayoutNSProps<T extends GridLayout = GridLayout, R extends keyof T = never> = LayoutBaseNSProps<
T,
| 'rows'
| 'columns'
| R
>

export type RootLayoutNSProps<T extends RootLayout = RootLayout, R extends keyof T = never> = GridLayoutNSProps<
T,
| R
>

export type SpanNSProps<T extends Span = Span, R extends keyof T = never> = ViewBaseNSProps<
T,
| 'fontFamily'
| 'fontSize'
| 'fontStyle'
| 'fontWeight'
| 'fontVariationSettings'
| 'textDecoration'
| 'color'
| 'backgroundColor'
| 'iosAccessibilityAdjustsFontSize'
| 'iosAccessibilityMinFontScale'
| 'iosAccessibilityMaxFontScale'
| 'text'
| 'tappable'
| R
>

export type FormattedStringNSProps<T extends FormattedString = FormattedString, R extends keyof T = never> = ViewBaseNSProps<
T,
| 'fontFamily'
| 'fontSize'
| 'fontStyle'
| 'fontWeight'
| 'fontVariationSettings'
| 'textDecoration'
| 'color'
| 'backgroundColor'
| 'iosAccessibilityAdjustsFontSize'
| 'iosAccessibilityMinFontScale'
| 'iosAccessibilityMaxFontScale'
| R
>

export type TextBaseNSProps<T extends TextBase = TextBase, R extends keyof T = never> = ViewNSProps<
T,
| 'text'
| 'formattedText'
| 'fontFamily'
| 'fontSize'
| 'fontStyle'
| 'fontWeight'
| 'letterSpacing'
| 'lineHeight'
| 'textAlignment'
| 'textDecoration'
| 'textTransform'
| 'textShadow'
| 'textStroke'
| 'whiteSpace'
| 'textOverflow'
| 'maxLines'
| 'padding'
| 'paddingBottom'
| 'paddingLeft'
| 'paddingRight'
| 'paddingTop'
| 'iosTextAnimation'
| R
>

export type ButtonNSProps<T extends Button = Button, R extends keyof T = never> = TextBaseNSProps<
T,
| 'textWrap'
| R
>

export type FlexboxLayoutNSProps<T extends FlexboxLayout = FlexboxLayout, R extends keyof T = never> = LayoutBaseNSProps<
T,
| 'flexDirection'
| 'flexWrap'
| 'justifyContent'
| 'alignItems'
| 'alignContent'
| R
>

export type ContentViewNSProps<T extends ContentView = ContentView, R extends keyof T = never> = ContainerViewNSProps<
T,
| 'content'
| R
>

export type PageNSProps<T extends Page = Page, R extends keyof T = never> = ContentViewNSProps<
T,
| 'backgroundSpanUnderStatusBar'
| 'androidStatusBarBackground'
| 'actionBarHidden'
| 'enableSwipeBackNavigation'
| 'navigationContext'
| 'accessibilityAnnouncePageEnabled'
| R
>

export type StackLayoutNSProps<T extends StackLayout = StackLayout, R extends keyof T = never> = LayoutBaseNSProps<
T,
| 'orientation'
| R
>

export type WrapLayoutNSProps<T extends WrapLayout = WrapLayout, R extends keyof T = never> = LayoutBaseNSProps<
T,
| 'orientation'
| 'itemWidth'
| 'itemHeight'
| R
>

export type DockLayoutNSProps<T extends DockLayout = DockLayout, R extends keyof T = never> = LayoutBaseNSProps<
T,
| 'stretchLastChild'
| R
>

export type AbsoluteLayoutNSProps<T extends AbsoluteLayout = AbsoluteLayout, R extends keyof T = never> = LayoutBaseNSProps<
T,
| R
>

export type LabelNSProps<T extends Label = Label, R extends keyof T = never> = TextBaseNSProps<
T,
| 'textWrap'
| R
>

export type FrameNSProps<T extends Frame = Frame, R extends keyof T = never> = ContainerViewNSProps<
T,
| 'defaultPage'
| 'actionBarVisibility'
| 'iosNavigationBarClass'
| 'iosToolBarClass'
| R
>

export type ProxyViewContainerNSProps<T extends ProxyViewContainer = ProxyViewContainer, R extends keyof T = never> = LayoutBaseNSProps<
T,
| R
>

export type ImageNSProps<T extends Image = Image, R extends keyof T = never> = ViewNSProps<
T,
| 'imageSource'
| 'src'
| 'stretch'
| 'loadMode'
| 'tintColor'
| 'decodeHeight'
| 'decodeWidth'
| 'iosSymbolEffect'
| 'iosSymbolScale'
| R
>

export type SwitchNSProps<T extends Switch = Switch, R extends keyof T = never> = ViewNSProps<
T,
| 'checked'
| 'offBackgroundColor'
| R
>

export type EditableTextBaseNSProps<T extends EditableTextBase = EditableTextBase, R extends keyof T = never> = TextBaseNSProps<
T,
| 'keyboardType'
| 'returnKeyType'
| 'updateTextTrigger'
| 'autocapitalizationType'
| 'autofillType'
| 'editable'
| 'autocorrect'
| 'hint'
| 'maxLength'
| 'placeholderColor'
| R
>

export type TextFieldNSProps<T extends TextField = TextField, R extends keyof T = never> = EditableTextBaseNSProps<
T,
| 'secure'
| 'closeOnReturn'
| 'secureWithoutAutofill'
| R
>

export type TextViewNSProps<T extends TextView = TextView, R extends keyof T = never> = EditableTextBaseNSProps<
T,
| 'maxLines'
| R
>

export type TimePickerNSProps<T extends TimePicker = TimePicker, R extends keyof T = never> = ViewNSProps<
T,
| 'hour'
| 'minute'
| 'time'
| 'maxHour'
| 'maxMinute'
| 'minHour'
| 'minMinute'
| 'minuteInterval'
| 'iosPreferredDatePickerStyle'
| R
>

export type WebViewNSProps<T extends WebView = WebView, R extends keyof T = never> = ViewNSProps<
T,
| 'src'
| 'disableZoom'
| 'iosAllowInlineMediaPlayback'
| R
>

export type SliderNSProps<T extends Slider = Slider, R extends keyof T = never> = ViewNSProps<
T,
| 'value'
| 'minValue'
| 'maxValue'
| 'accessibilityStep'
| R
>

export type PlaceholderNSProps<T extends Placeholder = Placeholder, R extends keyof T = never> = ViewNSProps<
T,
| R
>

export type ActivityIndicatorNSProps<T extends ActivityIndicator = ActivityIndicator, R extends keyof T = never> = ViewNSProps<
T,
| 'busy'
| 'iosIndicatorViewStyle'
| R
>

export type DatePickerNSProps<T extends DatePicker = DatePicker, R extends keyof T = never> = ViewNSProps<
T,
| 'year'
| 'month'
| 'day'
| 'date'
| 'maxDate'
| 'minDate'
| 'iosPreferredDatePickerStyle'
| 'showTime'
| R
>

export type HtmlViewNSProps<T extends HtmlView = HtmlView, R extends keyof T = never> = ViewNSProps<
T,
| 'html'
| 'selectable'
| 'linkColor'
| R
>

export type ProgressNSProps<T extends Progress = Progress, R extends keyof T = never> = ViewNSProps<
T,
| 'value'
| 'maxValue'
| R
>

export type ScrollViewNSProps<T extends ScrollView = ScrollView, R extends keyof T = never> = ContentViewNSProps<
T,
| 'isScrollEnabled'
| 'scrollBarIndicatorVisible'
| 'orientation'
| R
>

export type SearchBarNSProps<T extends SearchBar = SearchBar, R extends keyof T = never> = ViewNSProps<
T,
| 'text'
| 'hint'
| 'textFieldBackgroundColor'
| 'textFieldHintColor'
| 'clearButtonColor'
| R
>

export type ActionItemNSProps<T extends ActionItem = ActionItem, R extends keyof T = never> = ViewBaseNSProps<
T,
| 'text'
| 'icon'
| 'actionView'
| 'visibility'
| R
>

export type NavigationButtonNSProps<T extends NavigationButton = NavigationButton, R extends keyof T = never> = ActionItemNSProps<
T,
| R
>

export type ActionBarNSProps<T extends ActionBar = ActionBar, R extends keyof T = never> = ViewNSProps<
T,
| 'title'
| 'titleView'
| 'navigationButton'
| 'flat'
| 'actionItems'
| 'iosIconRenderingMode'
| R
>

export type ListPickerNSProps<T extends ListPicker = ListPicker, R extends keyof T = never> = ViewNSProps<
T,
| 'selectedIndex'
| 'items'
| R
>

export type ListViewNSProps<T extends ListView = ListView, R extends keyof T = never> = ViewNSProps<
T,
| 'items'
| 'itemTemplate'
| 'itemTemplates'
| 'itemTemplateSelector'
| 'itemIdGenerator'
| 'separatorColor'
| 'rowHeight'
| 'iosEstimatedRowHeight'
| 'stickyHeader'
| 'stickyHeaderTemplate'
| 'stickyHeaderHeight'
| 'stickyHeaderTopPadding'
| 'sectioned'
| 'showSearch'
| 'searchAutoHide'
| R
>

export type SegmentedBarNSProps<T extends SegmentedBar = SegmentedBar, R extends keyof T = never> = ViewNSProps<
T,
| 'selectedIndex'
| 'selectedBackgroundColor'
| 'selectedTextColor'
| 'items'
| R
>

export type SegmentedBarItemNSProps<T extends SegmentedBarItem = SegmentedBarItem, R extends keyof T = never> = ViewBaseNSProps<
T,
| 'title'
| R
>

export type TabViewNSProps<T extends TabView = TabView, R extends keyof T = never> = ViewNSProps<
T,
| 'items'
| 'selectedIndex'
| 'tabTextFontSize'
| 'tabTextColor'
| 'tabBackgroundColor'
| 'selectedTabTextColor'
| 'iosTabBarMinimizeBehavior'
| 'iosBottomAccessory'
| 'androidSelectedTabHighlightColor'
| 'iosIconRenderingMode'
| 'androidIconRenderingMode'
| 'androidOffscreenTabLimit'
| 'androidTabsPosition'
| 'androidSwipeEnabled'
| R
>

export type TabViewItemNSProps<T extends TabViewItem = TabViewItem, R extends keyof T = never> = ViewBaseNSProps<
T,
| 'title'
| 'view'
| 'iconSource'
| 'textTransform'
| R
>
