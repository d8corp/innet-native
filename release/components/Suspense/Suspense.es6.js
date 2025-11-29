import { EMPTY } from '@innet/jsx';
import innet, { useHandler } from 'innet';
import { State, Cache, Watch } from 'watch-state';
import { SUSPENSE } from '../../constants.es6.js';
import '../../hooks/index.es6.js';
import { useChildrenFragment } from '../../hooks/useChildrenFragment/useChildrenFragment.es6.js';

function Suspense({ fallback, children }) {
    const [childrenHandler, fragment] = useChildrenFragment();
    const promises = new State(new Set());
    const showFallback = new Cache(() => Boolean(promises.value.size));
    childrenHandler[SUSPENSE] = promises;
    innet([() => showFallback.value ? fallback : null, fragment], useHandler(), 0, true);
    innet(children, childrenHandler, 0, true);
    new Watch(() => {
        fragment.visibility = showFallback.value ? 'hidden' : 'visible';
    });
    return EMPTY;
}

export { Suspense };
