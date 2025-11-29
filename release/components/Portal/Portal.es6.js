import { EMPTY } from '@innet/jsx';
import innet, { useNewHandler } from 'innet';
import { queueNanotask } from 'queue-nano-task';
import '../../utils/index.es6.js';
import { setParent } from '../../utils/setParent/setParent.es6.js';
import { updateChildren } from '../../utils/updateChildren/updateChildren.es6.js';

function Portal({ parent, children }) {
    const childrenHandler = useNewHandler();
    setParent(childrenHandler, parent);
    queueNanotask(() => {
        updateChildren(parent);
    }, 1, true);
    innet(children, childrenHandler, 0, true);
    return EMPTY;
}

export { Portal };
