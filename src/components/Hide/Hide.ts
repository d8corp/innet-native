import { inject, type WatchValue } from '@watch-state/utils'

export interface HideProps {
  when: WatchValue<any>
  children?: JSX.Element
  fallback?: JSX.Element
}

export function Hide ({ when, children, fallback }: HideProps) {
  return inject(when, state => state ? fallback : children)
}
