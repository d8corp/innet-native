import { type Handler } from 'innet'

import { PARENT } from '../../constants'
import { type Parent } from '../../types'

export function setParent (handler: Handler, parent: Parent) {
  handler[PARENT] = parent
}
