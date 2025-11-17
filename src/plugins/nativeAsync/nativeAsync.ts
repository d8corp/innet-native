import innet, { type HandlerPlugin, useApp, useHandler } from 'innet'
import { onDestroy, scope } from 'watch-state'

import { useChildrenHandler } from '../../hooks'
import { Fragment } from '../../utils'

export function nativeAsync (): HandlerPlugin {
  return () => {
    const handler = useHandler()
    const app = useApp<Promise<any>>()
    const fragment = new Fragment()
    const childHandler = useChildrenHandler(fragment)

    innet(fragment, handler, 1, true)

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
