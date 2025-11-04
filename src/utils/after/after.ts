import { LayoutBase, type View } from '@nativescript/core'

export function after (target: View, view: View): void {
  const parent = target.parent

  if (parent instanceof LayoutBase) {
    parent.insertChild(view, parent.getChildIndex(target) + 1)
  } else {
    console.error('target element is not inside LayoutBase.')
  }
}
