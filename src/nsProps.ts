import {
  type AbsoluteLayout,
  type Button, type DockLayout, type EditableTextBase,
  type FlexboxLayout,
  type FormattedString, type Frame, type Image, type Label, type Page, type ProxyViewContainer,
  type RootLayout,
  type Span, type StackLayout, type Switch, type TextField,
  type View,
  type ViewBase, type WrapLayout,
} from '@nativescript/core'
import { type ContentView } from '@nativescript/core/ui/content-view'
import { type ContainerView } from '@nativescript/core/ui/core/view'
import { type GridLayout } from '@nativescript/core/ui/layouts/grid-layout'
import { type LayoutBase } from '@nativescript/core/ui/layouts/layout-base'
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
