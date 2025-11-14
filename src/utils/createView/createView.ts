import { JSX_ELEMENTS } from '../../elements'
import { type TagNameView, type ViewTagName } from '../../types'

export function createView<T extends ViewTagName> (tagName: T): InstanceType<TagNameView[T]> {
  return new JSX_ELEMENTS[tagName]() as InstanceType<TagNameView[T]>
}
