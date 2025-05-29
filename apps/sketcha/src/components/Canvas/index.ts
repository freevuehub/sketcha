import { EventListenerType } from '@sketcha/constant'
import { events } from '@sketcha/utils'
import './Sync'
import './Async'

class CanvasElement extends HTMLElement {
  points: [number, number, number][] = []

  constructor() {
    super()

    this.style.cssText = `
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
    `
  }
  connectedCallback() {
    console.log('connected')
  }

  disconnectedCallback() {
    console.log('Custom element removed from page.')
  }

  connectedMoveCallback() {
    console.log('Custom element moved with moveBefore()')
  }

  adoptedCallback() {
    console.log('Custom element moved to new page.')
  }
}

customElements.define('sketcha-canvas', CanvasElement)
