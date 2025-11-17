import { queueNanotask } from 'queue-nano-task'

export function onMount (callback: () => void) {
  queueNanotask(callback, 1)
}
