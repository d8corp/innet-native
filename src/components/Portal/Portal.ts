import { EMPTY } from '@innet/jsx'
import { type LayoutBase } from '@nativescript/core'
import innet, { useNewHandler } from 'innet'
import { queueNanotask } from 'queue-nano-task'

import { setParent, updateChildren } from '../../utils'

export interface PortalProps {
  parent: LayoutBase
  children: JSX.Element
}

export function Portal ({ parent, children }: PortalProps) {
  const childrenHandler = useNewHandler()
  setParent(childrenHandler, parent)

  queueNanotask(() => {
    updateChildren(parent)
  }, 1, true)

  innet(children, childrenHandler, 0, true)

  return EMPTY
}
