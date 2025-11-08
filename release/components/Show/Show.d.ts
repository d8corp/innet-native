import { type WatchValue } from '@watch-state/utils';
export interface ShowProps {
    when: WatchValue<any>;
    children?: JSX.Element;
    fallback?: JSX.Element;
}
export declare function Show({ when, children, fallback }: ShowProps): JSX.Element | import("watch-state").Watcher<JSX.Element>;
