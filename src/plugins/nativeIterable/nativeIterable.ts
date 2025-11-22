import { GenericComponent } from '@innet/jsx'
import innet, { type HandlerPlugin, NEXT, useApp, useHandler } from 'innet'
import { queueNanotask } from 'queue-nano-task'
import { onDestroy, scope, Watch } from 'watch-state'

import { useChildrenFragment } from '../../hooks'

export const nativeIterable = (): HandlerPlugin => () => {
  const genericComponent = useApp()

  if (!(genericComponent instanceof GenericComponent)) return NEXT

  const { app: apps, data } = genericComponent

  if (!(data instanceof Promise)) {
    queueNanotask(() => genericComponent.app.next(), 0, true)
    innet(data.value, useHandler(), 0, true)
    return
  }

  const [childrenHandler, fragment] = useChildrenFragment()

  const { activeWatcher } = scope
  let watcher: Watch
  let deleted = false

  innet(fragment, useHandler(), 0, true)

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

      innet(app, childrenHandler, 0, true)
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
