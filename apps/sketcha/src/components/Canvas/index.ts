import { events } from '@sketcha/utils'
import { EventListenerType } from '@sketcha/constant'
import './Sync'
import './Async'

class CanvasElement extends HTMLElement {
  points: [number, number, number][] = []

  constructor() {
    super()

    this.innerHTML = `
      <sketcha-sync-canvas></sketcha-sync-canvas>
      <sketcha-async-canvas></sketcha-async-canvas>
    `

    process.env.NODE_ENV === 'development' && this.dev()
  }

  dev() {
    const eventLogElement = document.createElement('ul')
    const createLiElement = (text: string) => {
      const liElement = document.createElement('li')

      liElement.style.cssText = `
        font-size: 10px;
      `
      liElement.innerText = text
      eventLogElement.append(liElement)
      eventLogElement.scrollTo({ top: eventLogElement.scrollHeight })
    }

    eventLogElement.style.cssText = `
      position: fixed;
      right: 10px;
      bottom: 10px;
      height: 100px;
      width: 110px;
      border: 1px solid #00000050;
      background-color: #ffffff;
      z-index: 101;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 5px;
    `

    this.append(eventLogElement)

    events.on(EventListenerType.DRAW_START, () => {
      createLiElement(EventListenerType.DRAW_START)
    })
    events.on(EventListenerType.DRAWING, () => {
      createLiElement(EventListenerType.DRAWING)
    })
    events.on(EventListenerType.DRAW_END, () => {
      createLiElement(EventListenerType.DRAW_END)
    })
    events.on(EventListenerType.TOUCH, () => {
      createLiElement(EventListenerType.TOUCH)
    })
    events.on(EventListenerType.CLICK, () => {
      createLiElement(EventListenerType.CLICK)
    })
  }
}

customElements.define('sketcha-canvas', CanvasElement)
