import { inject } from '@watch-state/utils';

function Hide({ when, children, fallback }) {
    return inject(when, state => state ? fallback : children);
}

export { Hide };
