import innet, { type HandlerPlugin, useApp, useHandler } from 'innet'
import { queueNanotask } from 'queue-nano-task'
import { onDestroy, scope } from 'watch-state'

import { useChildrenFragment } from '../../hooks'
import { updateChildren } from '../../utils'

export function nativeAsync (): HandlerPlugin {
  return () => {
    const { activeWatcher } = scope
    const app = useApp<Promise<any>>()
    const [childrenHandler, fragment] = useChildrenFragment()

    innet(fragment, useHandler(), 0, true)

    let removed = false

    onDestroy(() => {
      removed = true
    })

    app.then(data => {
      if (!removed) {
        scope.activeWatcher = activeWatcher

        innet(data, childrenHandler, 0, true)

        queueNanotask(() => {
          updateChildren(fragment)
        }, 1, true)

        scope.activeWatcher = undefined
      }
    })
  }
}
