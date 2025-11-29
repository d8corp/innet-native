export interface SuspenseProps {
    fallback?: JSX.Element;
    children?: JSX.Element;
}
export declare function Suspense({ fallback, children }: SuspenseProps): symbol;
