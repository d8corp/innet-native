import { type AnimationDefinition, type View } from '@nativescript/core'

import { ENDING_ANIMATE } from '../../constants'

export function getViewEndingAnimate (view: View): AnimationDefinition | undefined {
  return view[ENDING_ANIMATE]
}
