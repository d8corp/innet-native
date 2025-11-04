import { LayoutBase, type View } from '@nativescript/core'

export function before (target: View, view: View): void {
  const parent = target.parent

  if (parent instanceof LayoutBase) {
    parent.insertChild(view, Math.max(parent.getChildIndex(target) - 1, 0))
  } else {
    console.error('target element is not inside LayoutBase.')
  }
}
