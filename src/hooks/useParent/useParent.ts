import { useHandler } from 'innet'

import { type Parent } from '../../types'
import { getParent } from '../../utils'

export function useParent<T extends Parent> (): T {
  return getParent(useHandler())
}
