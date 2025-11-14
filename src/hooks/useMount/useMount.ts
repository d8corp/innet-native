import { onDestroy, scope } from 'watch-state'

import { onMount } from '../../utils'

export function useMount (callback: () => (() => void) | void) {
  const { activeWatcher } = scope

  onMount(() => {
    scope.activeWatcher = activeWatcher

    const result = callback()

    if (result) {
      onDestroy(result)
    }

    scope.activeWatcher = undefined
  })
}
