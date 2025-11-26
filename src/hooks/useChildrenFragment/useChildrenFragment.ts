import { ProxyViewContainer } from '@nativescript/core'
import { useNewHandler } from 'innet'

import { setParent } from '../../utils'

export function useChildrenFragment () {
  const fragment = new ProxyViewContainer()
  const childrenHandler = useNewHandler()

  setParent(childrenHandler, fragment)

  return [childrenHandler, fragment] as const
}
