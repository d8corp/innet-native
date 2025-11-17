import { useHandler, NEXT, useApp } from 'innet';
import { onDestroy } from 'watch-state';
import { SUSPENSE } from '../../constants.es6.js';

function suspense() {
    return () => {
        const promises = useHandler()[SUSPENSE];
        if (!promises)
            return NEXT;
        const app = useApp();
        let destroyed = false;
        promises.value.add(app);
        promises.update();
        onDestroy(() => {
            destroyed = true;
            promises.value.delete(app);
            promises.update();
        });
        app.finally(() => {
            if (!destroyed) {
                promises.value.delete(app);
                promises.update();
            }
        });
        return NEXT;
    };
}

export { suspense };
