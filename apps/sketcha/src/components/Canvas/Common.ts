import { events } from '@sketcha/utils'
import { CanvasType, EventListenerType } from '@sketcha/constant'
import { pipe } from '@fxts/core'
import type { Point } from '@sketcha/types'

class EventManager extends HTMLCanvasElement {
  isDrawing: boolean = false
}

class CommonCanvas extends EventManager {
  canvasElement: HTMLCanvasElement | null = null

  static observedAttributes = ['type', 'color']

  constructor() {
    super()

    this.style.cssText = `
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      inset: 0;
      touch-action: none;
      z-index: ${this.getAttribute('type') === CanvasType.ASYNC ? -1 : 1};
    `
    pipe(
      window,
      ({ innerWidth, innerHeight, devicePixelRatio }) => ({
        width: innerWidth,
        height: innerHeight,
        ratio: devicePixelRatio,
      }),
      (size) => {
        this.width = size.width * size.ratio
        this.height = size.height * size.ratio
      }
    )

    this.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch') return
      if (event.pointerType === 'mouse' && !event.ctrlKey) return

      pipe(event.currentTarget as HTMLCanvasElement, (element) => {
        element.setPointerCapture(event.pointerId)
        this.isDrawing = true
        events.emit(EventListenerType.DRAW_START, event, element)
      })
    })
    this.addEventListener('pointermove', (event) => {
      if (!this.isDrawing) return
      // if (event.pointerType === 'touch') return

      pipe(event.currentTarget as HTMLCanvasElement, (element) => {
        if (!element.hasPointerCapture(event.pointerId)) return
        this.isDrawing && events.emit(EventListenerType.DRAWING, event, element)
      })
    })
    this.addEventListener('pointerup', (event) => {
      if (!this.isDrawing) return

      // if (event.pointerType === 'touch') return
      pipe(event.currentTarget as HTMLCanvasElement, (element) => {
        this.isDrawing = false
        events.emit(EventListenerType.DRAW_END, event, element)
      })
    })
    this.addEventListener('pointercancel', (event) => {
      if (!this.isDrawing) return
      // if (event.pointerType === 'touch') return
      pipe(event.currentTarget as HTMLCanvasElement, (element) => {
        this.isDrawing = false
      })
    })
  }

  get Context() {
    return this.getContext('2d')!
  }
}

export default CommonCanvas
