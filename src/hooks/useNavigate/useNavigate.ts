import { type Page } from '@nativescript/core'
import innet, { useNewHandler } from 'innet'

import { PARENT_FRAME } from '../../constants'
import { setParent } from '../../utils'

export function useNavigate () {
  const handler = useNewHandler()
  const parentFrame = handler[PARENT_FRAME]
  setParent(handler, [])

  if (!parentFrame) {
    throw new Error('useNavigate must be used in a Frame context')
  }

  return (page: Page | JSX.Element) => {
    innet(page, handler, 1, true)
  }
}
