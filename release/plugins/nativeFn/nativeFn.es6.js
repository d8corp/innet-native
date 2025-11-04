import { Span } from '@nativescript/core';
import innet, { useApp, useHandler } from 'innet';
import { Watch } from 'watch-state';
import '../../hooks/index.es6.js';
import { useParent } from '../../hooks/useParent/useParent.es6.js';
import { useView } from '../../hooks/useView/useView.es6.js';
import { useChildrenHandler } from '../../hooks/useChildrenHandler/useChildrenHandler.es6.js';

function nativeFn() {
    return () => {
        const fn = useApp();
        const parent = useParent();
        if (parent instanceof Span) {
            new Watch((update) => {
                parent.text = String(fn(update));
            });
            return;
        }
        const fragment = useView('fragment');
        const childrenHandler = useChildrenHandler(fragment);
        innet(fragment, useHandler());
        new Watch(update => {
            if (update) {
                fragment.removeChildren();
            }
            innet(fn(update), childrenHandler);
        });
    };
}

export { nativeFn };
