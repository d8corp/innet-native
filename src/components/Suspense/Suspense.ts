import { EMPTY } from '@innet/jsx'
import innet, { useHandler } from 'innet'
import { Cache, State, Watch } from 'watch-state'

import { SUSPENSE } from '../../constants'
import { useChildrenFragment } from '../../hooks'

export interface SuspenseProps {
  fallback?: JSX.Element
  children?: JSX.Element
}

export function Suspense ({ fallback, children }: SuspenseProps) {
  const [childrenHandler, fragment] = useChildrenFragment()

  const promises = new State(new Set<Promise<any>>())
  const showFallback = new Cache(() => Boolean(promises.value.size))

  childrenHandler[SUSPENSE] = promises

  innet([() => showFallback.value ? fallback : null, fragment], useHandler(), 0, true)
  innet(children, childrenHandler, 0, true)

  new Watch(() => {
    fragment.shown = !showFallback.value
  })

  return EMPTY
}
