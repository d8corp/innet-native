import innet, { useNewHandler } from 'innet';
import { queueNanotask } from 'queue-nano-task';
import { PARENT_FRAME } from '../../constants.es6.js';
import '../../utils/index.es6.js';
import { setParent } from '../../utils/setParent/setParent.es6.js';
import { getChildren } from '../../utils/getChildren/getChildren.es6.js';
import { updateChildren } from '../../utils/updateChildren/updateChildren.es6.js';

function useNavigate() {
    const handler = useNewHandler();
    const parentFrame = handler[PARENT_FRAME];
    if (!parentFrame) {
        throw new Error('useNavigate must be used in a Frame context');
    }
    setParent(handler, parentFrame);
    return (page) => {
        queueNanotask(() => {
            getChildren(parentFrame).length = 0;
            queueNanotask(() => {
                updateChildren(parentFrame);
            }, 1, true);
            innet(page, handler, 0, true);
        }, 0, true);
    };
}

export { useNavigate };
