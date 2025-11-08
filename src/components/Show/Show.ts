import { inject, type WatchValue } from '@watch-state/utils'

export interface ShowProps {
  when: WatchValue<any>
  children?: JSX.Element
  fallback?: JSX.Element
}

export function Show ({ when, children, fallback }: ShowProps) {
  return inject(when, state => state ? children : fallback)
}
