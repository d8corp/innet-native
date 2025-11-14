import innet from 'innet';
import { onDestroy } from 'watch-state';
import '../../hooks/index.es6.js';
import '../../utils/index.es6.js';
import { Fragment } from '../../utils/views/Fragment/Fragment.es6.js';
import { useChildrenHandler } from '../../hooks/useChildrenHandler/useChildrenHandler.es6.js';

function Portal({ parent, children }) {
    const fragment = new Fragment();
    const childHandler = useChildrenHandler(fragment);
    parent.addChild(fragment);
    onDestroy(() => { parent.removeChild(fragment); });
    innet(children, childHandler);
}

export { Portal };
