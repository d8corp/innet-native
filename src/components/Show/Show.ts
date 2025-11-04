import { inject } from '@watch-state/utils'

import { type StateProp } from '../../types'

export interface ShowProps {
  when: StateProp<any>
  children?: JSX.Element
  fallback?: JSX.Element
}

export function Show ({ when, children, fallback }: ShowProps) {
  return inject(when, state => state ? children : fallback)
}
