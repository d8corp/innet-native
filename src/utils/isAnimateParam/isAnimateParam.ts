import { ANIMATE_PARAMS } from '../../constants'

export function isAnimateParam (key: any): key is typeof ANIMATE_PARAMS[number] {
  return ANIMATE_PARAMS.includes(key as typeof ANIMATE_PARAMS[number])
}
