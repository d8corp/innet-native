import { useNewHandler } from 'innet'

import { Fragment, setParent } from '../../utils'

export function useChildrenFragment () {
  const fragment = new Fragment()
  const childrenHandler = useNewHandler()

  setParent(childrenHandler, fragment)

  return [childrenHandler, fragment] as const
}
