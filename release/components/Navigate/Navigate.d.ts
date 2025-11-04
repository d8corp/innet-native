import { type NavigationEntry } from '@nativescript/core';
export type NavigateBaseProps = Omit<NavigationEntry, 'create' | 'moduleName'>;
export interface NavigateCreateProps extends NavigateBaseProps, Pick<NavigationEntry, 'create'> {
}
export interface NavigateModuleProps extends NavigateBaseProps, Pick<NavigationEntry, 'moduleName'> {
}
export interface NavigateChildrenProps extends NavigateBaseProps {
    children: JSX.Element;
}
export type NavigateProps = NavigateCreateProps | NavigateModuleProps | NavigateChildrenProps;
export declare function Navigate(props: NavigateProps): symbol;
