import { LayoutBase } from '@nativescript/core'
import { type Handler } from 'innet'
import { onDestroy } from 'watch-state'

import { getParent } from '../getParent'
import { setParent } from '../setParent'
import { Fragment } from '../views'

export function getContainer (
  handler: Handler,
  freeParent = false,
  parent = getParent(handler),
): [Handler, Fragment] {
  const container = new Fragment()
  const childHandler: Handler = Object.create(handler)
  setParent(childHandler, container)

  if (typeof parent === 'function') {
    parent(container)
    return [childHandler, container] as const
  }

  if (parent instanceof LayoutBase) {
    parent.addChild(container)

    if (!freeParent) {
      onDestroy(() => { parent.removeChild(container) })
    }

    return [childHandler, container] as const
  }

  throw Error(`You cannot get content, parent is ${parent?.typeName}`)
}
