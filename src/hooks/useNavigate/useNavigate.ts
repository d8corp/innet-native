import { type Page } from '@nativescript/core'
import innet, { useNewHandler } from 'innet'
import { queueNanotask } from 'queue-nano-task'

import { PARENT_FRAME } from '../../constants'
import { getChildren, setParent, updateChildren } from '../../utils'

export function useNavigate () {
  const handler = useNewHandler()
  const parentFrame = handler[PARENT_FRAME]

  if (!parentFrame) {
    throw new Error('useNavigate must be used in a Frame context')
  }

  setParent(handler, parentFrame)

  return (page: Page | JSX.Element) => {
    queueNanotask(() => {
      getChildren(parentFrame).length = 0

      queueNanotask(() => {
        updateChildren(parentFrame)
      }, 1, true)

      innet(page, handler, 0, true)
    }, 0, true)
  }
}
