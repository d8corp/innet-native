import { ProxyViewContainer, type View } from '@nativescript/core'

export class Fragment extends ProxyViewContainer {
  #shown = true
  #shadow: View[] = []

  get shown () {
    return this.#shown
  }

  set shown (shown: boolean) {
    if (shown === this.#shown) return

    if (shown) {
      this.#shadow.forEach(view => {
        super.addChild(view)
      })
    } else {
      this.#shadow.forEach(view => {
        super.removeChild(view)
      })
    }

    this.#shown = shown
  }

  getChildrenCount () {
    return this.#shadow.length
  }

  getChildAt (index: number): View {
    return this.#shadow[index]
  }

  getChildIndex (view: View): number {
    return this.#shadow.indexOf(view)
  }

  addChild (view: View) {
    this.#shadow.push(view)

    if (this.#shown) {
      super.addChild(view)
    }
  }

  insertChild (child: View, atIndex: number): boolean {
    this.#shadow.splice(atIndex, 0, child)

    if (this.#shown) {
      return super.insertChild(child, atIndex)
    }

    return true
  }

  removeChild (view: View) {
    this.#shadow = this.#shadow.filter(item => item !== view)

    if (this.#shown) {
      super.removeChild(view)
    }
  }

  removeChildren () {
    this.#shadow = []

    if (this.#shown) {
      super.removeChildren()
    }
  }
}
