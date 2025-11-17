import innet, { useHandler } from 'innet'
import { Cache, State, Watch } from 'watch-state'

import { SUSPENSE } from '../../constants'
import { useChildrenHandler } from '../../hooks'
import { Fragment } from '../../utils'

export interface SuspenseProps {
  fallback?: JSX.Element
  children?: JSX.Element
}

export function Suspense ({ fallback, children }: SuspenseProps) {
  const fragment = new Fragment()
  const childrenHandler = useChildrenHandler(fragment)
  const promises = new State(new Set<Promise<any>>())
  const showFallback = new Cache(() => Boolean(promises.value.size))

  childrenHandler[SUSPENSE] = promises

  new Watch(() => {
    fragment.shown = !showFallback.value
  })

  innet(fragment, useHandler(), 0, true)
  innet(children, childrenHandler)

  return () => showFallback.value ? fallback : null
}
