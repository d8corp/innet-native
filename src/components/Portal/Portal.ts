import { type LayoutBase } from '@nativescript/core'
import innet from 'innet'
import { onDestroy } from 'watch-state'

import { useChildrenHandler } from '../../hooks'
import { Fragment } from '../../utils'

export interface PortalProps {
  parent: LayoutBase
  children: JSX.Element
}

export function Portal ({ parent, children }: PortalProps) {
  const fragment = new Fragment()
  const childHandler = useChildrenHandler(fragment)

  parent.addChild(fragment)
  onDestroy(() => { parent.removeChild(fragment) })

  innet(children, childHandler)
}
