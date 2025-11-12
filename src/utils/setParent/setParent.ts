import { type ViewBase } from '@nativescript/core'
import { type Handler } from 'innet'

import { PARENT } from '../../constants'
import { type Parent } from '../../types'

export function setParent<T extends ViewBase> (handler: Handler, parent: Parent<T>) {
  handler[PARENT] = parent
}
