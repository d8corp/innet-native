import { type LayoutBase } from '@nativescript/core';
export interface PortalProps {
    parent: LayoutBase;
    children: JSX.Element;
}
export declare function Portal({ parent, children }: PortalProps): symbol;
