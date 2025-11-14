import { callHandler } from '@innet/utils';
import innet from 'innet';

function onMount(callback) {
    innet(callback, callHandler, 3);
}

export { onMount };
