import { EMPTY } from '@innet/jsx';
import { type WatchValue } from '@watch-state/utils';
import { State } from 'watch-state';
export type ForKeyFn<T, V> = (data: T) => V;
export type ForKeyStr<T, V> = {
    [P in keyof T]: T[P] extends V | undefined ? P : never;
}[keyof T];
export type ForKey<T, V> = ForKeyFn<T, V> | ForKeyStr<T, V>;
export declare function getForKey<T, V>(data: T, key?: ForKey<T, V>): V;
type GetType<T extends WatchValue<Iterable<any>>> = T extends WatchValue<Iterable<infer TT>> ? TT : never;
type GetKey<T extends WatchValue<Iterable<any>>, V extends ForKey<GetType<T>, any>> = V extends ForKeyStr<GetType<T>, infer VV> ? VV : V extends ForKeyFn<GetType<T>, infer VV> ? VV : never;
export interface ForProps<T extends WatchValue<Iterable<any>>, V extends ForKey<GetType<T>, any>> {
    of?: T;
    key?: V;
    fallback?: JSX.Element;
    children?: (value: T extends Iterable<GetType<T>> ? GetType<T> : State<GetType<T>>, index: T extends Iterable<GetType<T>> ? number : State<number>, key: V extends string ? V extends keyof GetType<T> ? GetType<T>[V] : never : GetKey<T, V>) => JSX.Element;
}
export declare function For<T extends WatchValue<Iterable<any>>, V extends ForKey<GetType<T>, any>>({ key, of: ofPropRaw, children, }: ForProps<T, V>): JSX.Element[] | typeof EMPTY;
export {};
