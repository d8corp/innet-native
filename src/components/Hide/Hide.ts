import { inject } from '@watch-state/utils'

import { type StateProp } from '../../types'

export interface HideProps {
  when: StateProp<any>
  children?: JSX.Element
  fallback?: JSX.Element
}

export function Hide ({ when, children, fallback }: HideProps) {
  return inject(when, state => state ? fallback : children)
}
