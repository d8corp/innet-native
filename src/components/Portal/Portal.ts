import { type LayoutBase } from '@nativescript/core'
import innet from 'innet'
import { onDestroy } from 'watch-state'

import { useChildrenHandler, useView } from '../../hooks'

export interface PortalProps {
  parent: LayoutBase
  children: JSX.Element
}

export function Portal ({ parent, children }: PortalProps) {
  const fragment = useView('fragment')
  const childHandler = useChildrenHandler(fragment)

  parent.addChild(fragment)
  onDestroy(() => { parent.removeChild(fragment) })

  innet(children, childHandler)
}
