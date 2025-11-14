import type { AnimationDefinition } from '@nativescript/core'
import {
  ActionBar,
} from '@nativescript/core'

import { type JSX_ELEMENTS } from './elements'
import { type ViewProp, type ViewTagName } from './types'

export const RENDER_PROPS = {
  page: {
    actionBar: ActionBar,
  },
} as const satisfies {
  readonly [T in ViewTagName]?: {
    readonly [K in ViewProp<T>]?: new () => InstanceType<typeof JSX_ELEMENTS[T]>[K]
  };
}

export const PARENT = Symbol('parent') as unknown as string
export const FOR_VALUE = Symbol('FOR_VALUE') as unknown as string
export const FOR_INDEX = Symbol('FOR_INDEX') as unknown as string
export const FOR_WATCHER_KEY = Symbol('FOR_WATCHER_KEY') as unknown as string
export const PARENT_FRAME = Symbol('PARENT_FRAME') as unknown as string
export const PARENT_NAVIGATE = Symbol('PARENT_NAVIGATE') as unknown as string
export const ENDING_ANIMATE = Symbol('ENDING_ANIMATE')

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
