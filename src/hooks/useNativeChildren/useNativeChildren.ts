import { useChildren } from '@innet/jsx'
import { Frame, type ViewBase } from '@nativescript/core'
import innet, { useNewHandler } from 'innet'

import { PARENT_FRAME } from '../../constants'
import { setParent } from '../../utils'

export function useNativeChildren (target: ViewBase) {
  const children = useChildren()

  if (!children) return

  const childrenHandler = useNewHandler()
  setParent(childrenHandler, target)

  if (target instanceof Frame) {
    childrenHandler[PARENT_FRAME] = target
  }

  innet(children, childrenHandler, 0, true)
}
