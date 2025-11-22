import { type ViewBase } from '@nativescript/core'

import { CHILDREN } from '../../constants'
import { type Parent } from '../../types'

export function getChildren (target: Parent): ViewBase[] {
  if (Array.isArray(target)) {
    return target
  }

  if (!target[CHILDREN]) {
    target[CHILDREN] = []
  }

  return target[CHILDREN]
}
