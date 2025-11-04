import { EMPTY } from '@innet/jsx'
import { type Frame, type NavigationEntry } from '@nativescript/core'
import innet, { useHandler } from 'innet'

import { PARENT_FRAME, PARENT_NAVIGATE } from '../../constants'

export type NavigateBaseProps = Omit<NavigationEntry, 'create' | 'moduleName'>

export interface NavigateCreateProps extends NavigateBaseProps, Pick<NavigationEntry, 'create'> {}
export interface NavigateModuleProps extends NavigateBaseProps, Pick<NavigationEntry, 'moduleName'> {}
export interface NavigateChildrenProps extends NavigateBaseProps {
  children: JSX.Element
}

export type NavigateProps = NavigateCreateProps | NavigateModuleProps | NavigateChildrenProps

export function Navigate (props: NavigateProps) {
  const handler = useHandler()

  if ('create' in props || 'moduleName' in props) {
    const frame: Frame = handler[PARENT_FRAME]

    if (!frame) {
      throw Error('You can place <Navigate /> only in a <frame>')
    }

    frame.navigate(props)
  } else {
    const childHandler = Object.create(handler)
    const { children, ...rest } = props as NavigateChildrenProps
    handler[PARENT_NAVIGATE] = rest
    innet(children, childHandler)
  }

  return EMPTY
}
