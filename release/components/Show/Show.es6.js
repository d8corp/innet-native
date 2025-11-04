import { inject } from '@watch-state/utils';

function Show({ when, children, fallback }) {
    return inject(when, state => state ? children : fallback);
}

export { Show };
