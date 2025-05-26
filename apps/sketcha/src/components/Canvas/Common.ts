import { events, createCanvas } from '@sketcha/utils'
import { CanvasType, EventListenerType } from '@sketcha/constant'
import { pipe } from '@fxts/core'
import type { Point } from '@sketcha/types'

class EventManager extends HTMLElement {
  readonly MOVE_THRESHOLD: number = 0

  moveCount: number = 0
  isTouch: boolean = false
  isDrawing: boolean = false
}

class CommonCanvas extends EventManager {
  prevPoints: Point[] = []
  canvasElement: HTMLCanvasElement | null = null

  constructor() {
    super()

    this.style.cssText = `
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      inset: 0;
    `
  }

  get Context() {
    if (this.canvasElement === null) return null

    const context = this.canvasElement.getContext('2d')

    return context!
  }

  render(type: CanvasType) {
    this.canvasElement = pipe(
      window,
      ({ innerWidth, innerHeight, devicePixelRatio }) => ({
        width: innerWidth,
        height: innerHeight,
        ratio: devicePixelRatio,
      }),
      createCanvas(type)
    )
    this.style.zIndex = `${type === CanvasType.ASYNC ? -1 : 1}`

    this.append(this.canvasElement)
    this.canvasElement.addEventListener('touchstart', (event) => {
      this.isTouch = event.touches.length > 1
    })
    this.canvasElement.addEventListener('touchmove', (event) => {
      pipe(event.currentTarget as HTMLCanvasElement, (element) => {
        if (this.isTouch) {
          events.emit(EventListenerType.TOUCH, event, element)
        }
      })
    })
    this.canvasElement.addEventListener('touchend', () => {
      setTimeout(() => {
        this.isTouch = false
      }, 100)
    })
    this.canvasElement.addEventListener('pointerdown', (event) => {
      pipe(event.currentTarget as HTMLCanvasElement, (element) => {
        element.setPointerCapture(event.pointerId)

        if (this.isTouch) return

        events.emit(EventListenerType.DRAW_START, event, element)
      })
    })
    this.canvasElement.addEventListener('pointermove', (event) => {
      pipe(event.currentTarget as HTMLCanvasElement, (element) => {
        if (!element.hasPointerCapture(event.pointerId)) return
        if (this.isTouch) return
        if (this.moveCount >= this.MOVE_THRESHOLD) {
          events.emit(EventListenerType.DRAWING, event, element)

          this.isDrawing || (this.isDrawing = true)
        } else {
          this.moveCount++
        }
      })
    })
    this.canvasElement.addEventListener('pointerup', (event) => {
      pipe(event.currentTarget as HTMLCanvasElement, (element) => {
        this.prevPoints = []
        this.moveCount = 0

        if (this.isTouch) return

        events.emit(EventListenerType.DRAW_END, event, element)
      })
    })
  }
  destroy() {
    this.canvasElement && this.canvasElement.remove()
  }
}

export default CommonCanvas
