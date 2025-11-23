import { type AnimationDefinition } from '@nativescript/core'

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
