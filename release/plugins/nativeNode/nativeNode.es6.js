import { Page, Frame } from '@nativescript/core';
import { useApp, useHandler } from 'innet';
import { queueNanotask } from 'queue-nano-task';
import { PARENT_FRAME } from '../../constants.es6.js';
import '../../hooks/index.es6.js';
import '../../utils/index.es6.js';
import { useParent } from '../../hooks/useParent/useParent.es6.js';
import { getChildren } from '../../utils/getChildren/getChildren.es6.js';
import { updateChildren } from '../../utils/updateChildren/updateChildren.es6.js';

function nativeNode() {
    return () => {
        const app = useApp();
        const parent = useParent();
        if (Array.isArray(parent)) {
            parent.push(app);
        }
        else {
            const parentChildren = getChildren(parent);
            if (app instanceof Page) {
                const handler = useHandler();
                const parentFrame = handler[PARENT_FRAME];
                if (!parentFrame) {
                    throw Error(`You can place ${app} only in a Frame`);
                }
                if (parent instanceof Frame) {
                    parentChildren.push(app);
                }
                else {
                    queueNanotask(() => {
                        parentFrame.navigate(Object.assign(Object.assign({}, app.navigation), { create: () => app }));
                    }, 1, true);
                }
            }
            else {
                parentChildren.push(app);
            }
        }
        queueNanotask(() => {
            updateChildren(app);
        }, 1, true);
    };
}

export { nativeNode };
