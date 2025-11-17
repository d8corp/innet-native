import innet, { useApp, useHandler } from 'innet';
import { Watch } from 'watch-state';
import '../../hooks/index.es6.js';
import '../../utils/index.es6.js';
import { Fragment } from '../../utils/views/Fragment/Fragment.es6.js';
import { useChildrenHandler } from '../../hooks/useChildrenHandler/useChildrenHandler.es6.js';

function nativeFn() {
    return () => {
        const fn = useApp();
        const fragment = new Fragment();
        const childrenHandler = useChildrenHandler(fragment);
        innet(fragment, useHandler(), 1, true);
        new Watch(update => {
            if (update) {
                fragment.removeChildren();
            }
            innet(fn(update), childrenHandler);
        });
    };
}

export { nativeFn };
