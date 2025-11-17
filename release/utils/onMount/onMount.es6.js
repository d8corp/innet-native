import { queueNanotask } from 'queue-nano-task';

function onMount(callback) {
    queueNanotask(callback, 1);
}

export { onMount };
