import { type AnimationDefinition, type View } from '@nativescript/core'

import { ENDING_ANIMATE } from '../../constants'

export function setViewEndingAnimate (view: View, animate: AnimationDefinition) {
  // @ts-expect-error Hack for ending animations
  view[ENDING_ANIMATE] = animate
}
