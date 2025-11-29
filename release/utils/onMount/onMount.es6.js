import { withScope } from '@watch-state/utils';
import { queueNanotask } from 'queue-nano-task';

function onMount(callback) {
    queueNanotask(withScope(callback), 1);
}

export { onMount };
