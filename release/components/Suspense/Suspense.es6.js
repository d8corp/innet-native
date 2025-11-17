import innet, { useHandler } from 'innet';
import { State, Cache, Watch } from 'watch-state';
import { SUSPENSE } from '../../constants.es6.js';
import '../../hooks/index.es6.js';
import '../../utils/index.es6.js';
import { Fragment } from '../../utils/views/Fragment/Fragment.es6.js';
import { useChildrenHandler } from '../../hooks/useChildrenHandler/useChildrenHandler.es6.js';

function Suspense({ fallback, children }) {
    const fragment = new Fragment();
    const childrenHandler = useChildrenHandler(fragment);
    const promises = new State(new Set());
    const showFallback = new Cache(() => Boolean(promises.value.size));
    childrenHandler[SUSPENSE] = promises;
    new Watch(() => {
        fragment.shown = !showFallback.value;
    });
    innet(fragment, useHandler(), 1, true);
    innet(children, childrenHandler);
    return () => showFallback.value ? fallback : null;
}

export { Suspense };
