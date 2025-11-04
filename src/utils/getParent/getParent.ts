import { type Handler } from 'innet'

import { PARENT } from '../../constants'
import { type Parent } from '../../types'

export function getParent<T extends Parent> (handler: Handler): T {
  return handler[PARENT]
}
