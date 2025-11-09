import type { AnimationDefinition } from '@nativescript/core'

export const PARENT = Symbol('parent') as unknown as string
export const FOR_VALUE = Symbol('FOR_VALUE') as unknown as string
export const FOR_INDEX = Symbol('FOR_INDEX') as unknown as string
export const FOR_WATCHER_KEY = Symbol('FOR_WATCHER_KEY') as unknown as string
export const PARENT_FRAME = Symbol('PARENT_FRAME') as unknown as string
export const PARENT_NAVIGATE = Symbol('PARENT_NAVIGATE') as unknown as string

export const ANIMATE_PARAMS = [
  'height',
  'width',
  'opacity',
  'backgroundColor',
  'rotate',
  'scale',
  'translate',
] as const satisfies Array<keyof AnimationDefinition>

export const ANIMATE_PROPS = [
  ...ANIMATE_PARAMS,
  'scaleX',
  'scaleY',
  'translateX',
  'translateY',
  'rotateX',
  'rotateY',
] as const
