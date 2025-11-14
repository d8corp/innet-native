import { callHandler } from '@innet/utils'
import innet from 'innet'

export function onMount (callback: () => void) {
  innet(callback, callHandler, 3)
}
