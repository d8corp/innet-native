import { type ViewBase } from '@nativescript/core'
import { useHandler } from 'innet'

import { setParent } from '../../utils'

export function useChildrenHandler (view: ViewBase) {
  const handler = Object.create(useHandler())
  setParent(handler, view)
  return handler
}
