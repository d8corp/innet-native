import { ANIMATE_PROPS } from '../../constants'

export function isAnimateProp (key: any): key is typeof ANIMATE_PROPS[number] {
  return ANIMATE_PROPS.includes(key as typeof ANIMATE_PROPS[number])
}
