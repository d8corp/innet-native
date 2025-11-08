import { type WatchValue } from '@watch-state/utils';
export interface HideProps {
    when: WatchValue<any>;
    children?: JSX.Element;
    fallback?: JSX.Element;
}
export declare function Hide({ when, children, fallback }: HideProps): JSX.Element | import("watch-state").Watcher<JSX.Element>;
