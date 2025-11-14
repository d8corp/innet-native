import { ProxyViewContainer, type View } from '@nativescript/core';
/** @deprecated Temporary solution */
export declare class Fragment extends ProxyViewContainer {
    #private;
    get shown(): boolean;
    set shown(shown: boolean);
    getChildrenCount(): number;
    getChildAt(index: number): View;
    getChildIndex(view: View): number;
    addChild(view: View): void;
    insertChild(child: View, atIndex: number): boolean;
    removeChild(view: View): void;
    removeChildren(): void;
}
