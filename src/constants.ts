import {
  ActionBar,
  type AnimationDefinition,
  FormattedString,
  View,
} from '@nativescript/core'

import { type JSX_ELEMENTS } from './elements'
import { type ViewProp, type ViewTagName } from './types'

export const RENDER_PROPS = {
  page: {
    actionBar: ActionBar,
    content: View,
  },
  'text-field': {
    formattedText: FormattedString,
  },
  'text-view': {
    formattedText: FormattedString,
  },
  'action-bar': {
    titleView: View,
  },
  'action-item': {
    actionView: View,
  },
  'tab-view-item': {
    view: View,
  },
} as const satisfies {
  readonly [T in ViewTagName]?: {
    readonly [K in ViewProp<T>]?: abstract new () => InstanceType<typeof JSX_ELEMENTS[T]>[K]
  };
}

export const PARENT: unique symbol = Symbol('parent')
export const FOR_VALUE = Symbol('FOR_VALUE') as unknown as string
export const FOR_INDEX = Symbol('FOR_INDEX') as unknown as string
export const FOR_WATCHER_KEY = Symbol('FOR_WATCHER_KEY') as unknown as string
export const PARENT_FRAME: unique symbol = Symbol('PARENT_FRAME')
export const ENDING_ANIMATE: unique symbol = Symbol('ENDING_ANIMATE')
export const SUSPENSE: unique symbol = Symbol('SUSPENSE')
export const CHILDREN: unique symbol = Symbol('CHILDREN')

export const ANIMATE_PARAMS_PROPS = [
  'height',
  'width',
  'opacity',
  'backgroundColor',
  'rotate',
  'scale',
] as const satisfies Array<keyof AnimationDefinition>

export const ANIMATE_PARAMS = [
  ...ANIMATE_PARAMS_PROPS,
  'translate',
] as const satisfies Array<keyof AnimationDefinition>

export const ANIMATE_PROPS = [
  ...ANIMATE_PARAMS_PROPS,
  'scaleX',
  'scaleY',
  'translateX',
  'translateY',
  'rotateX',
  'rotateY',
] as const
