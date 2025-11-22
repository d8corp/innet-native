import { type RootLayout, type Span, type View, type ViewBase } from '@nativescript/core'
import { type ContainerView } from '@nativescript/core/ui/core/view'
import { type GridLayout } from '@nativescript/core/ui/layouts/grid-layout'
import { type LayoutBase } from '@nativescript/core/ui/layouts/layout-base'

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

export type SpanNSProps<T extends Span = Span> = ViewBaseNSProps<
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
>
