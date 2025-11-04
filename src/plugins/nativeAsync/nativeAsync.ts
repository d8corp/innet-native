import innet, { type HandlerPlugin, useApp, useHandler } from 'innet'
import { onDestroy, scope } from 'watch-state'

import { useChildrenHandler, useView } from '../../hooks'

export function nativeAsync (): HandlerPlugin {
  return () => {
    const handler = useHandler()
    const app = useApp<Promise<any>>()
    const fragment = useView('fragment')
    const childHandler = useChildrenHandler(fragment)

    innet(fragment, handler)

    let removed = false

    onDestroy(() => {
      removed = true
    })

    const { activeWatcher } = scope

    app.then(data => {
      if (!removed) {
        scope.activeWatcher = activeWatcher
        innet(data, childHandler)
        scope.activeWatcher = undefined
      }
    })
  }
}
