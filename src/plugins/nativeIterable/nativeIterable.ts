import { GenericComponent } from '@innet/jsx'
import innet, { type HandlerPlugin, NEXT, useApp, useHandler } from 'innet'
import { queueNanotask } from 'queue-nano-task'
import { onDestroy, scope, Watch } from 'watch-state'

import { useChildrenHandler } from '../../hooks'
import { Fragment } from '../../utils'

export const nativeIterable = (): HandlerPlugin => () => {
  const genericComponent = useApp()

  if (!(genericComponent instanceof GenericComponent)) return NEXT

  const handler = useHandler()
  const { app: apps, data } = genericComponent

  if (!(data instanceof Promise)) {
    innet(data.value, handler)
    queueNanotask(() => genericComponent.app.next())
    return
  }

  const fragment = new Fragment()
  const childrenHandler = useChildrenHandler(fragment)

  const { activeWatcher } = scope
  let watcher: Watch
  let deleted = false

  innet(fragment, handler, 0, true)

  onDestroy(() => {
    deleted = true
  })

  const call = (app: any) => {
    scope.activeWatcher = activeWatcher

    if (watcher) {
      watcher.destroy()
      fragment.removeChildren()
    }

    watcher = new Watch(update => {
      if (update) {
        fragment.removeChildren()
      }

      innet(app, childrenHandler)
    })

    scope.activeWatcher = undefined
  }

  const run = async () => {
    for await (const app of apps) {
      if (deleted) return

      call(app)
    }
  }

  data.then(({ value }) => {
    call(value)
    run()
  })
}
