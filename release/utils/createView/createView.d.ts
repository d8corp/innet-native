import { type TagNameView, type ViewTagName } from '../../types';
export declare function createView<T extends ViewTagName>(tagName: T): InstanceType<TagNameView[T]>;
