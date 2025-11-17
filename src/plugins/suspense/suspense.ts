import { type HandlerPlugin, NEXT, useApp, useHandler } from 'innet'
import { onDestroy } from 'watch-state'

import { SUSPENSE } from '../../constants'

export function suspense (): HandlerPlugin {
  return () => {
    const promises = useHandler()[SUSPENSE]

    if (!promises) return NEXT

    const app = useApp<Promise<any>>()
    let destroyed = false

    promises.value.add(app)
    promises.update()

    onDestroy(() => {
      destroyed = true
      promises.value.delete(app)
      promises.update()
    })

    app.finally(() => {
      if (!destroyed) {
        promises.value.delete(app)
        promises.update()
      }
    })

    return NEXT
  }
}
