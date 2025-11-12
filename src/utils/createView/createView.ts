import { JSX_ELEMENTS } from '../../constants'

export type ViewTagName = keyof typeof JSX_ELEMENTS
export type TagNameView = typeof JSX_ELEMENTS

export function createView<T extends ViewTagName> (tagName: T): InstanceType<TagNameView[T]> {
  return new JSX_ELEMENTS[tagName]() as InstanceType<TagNameView[T]>
}
