import { withScope } from '@watch-state/utils'
import { queueNanotask } from 'queue-nano-task'

export function onMount (callback: () => void) {
  queueNanotask(withScope(callback), 1)
}
