import { EventListenerType, CanvasType } from '@sketcha/constant'
import HTMLCanvasElement from './Common'
import { getStroke, events, getRealPoint, getSvgPath } from '@sketcha/utils'
import type { Point } from '@sketcha/types'
import { filter, head, pipe } from '@fxts/core'

class SyncCanvasElement extends HTMLCanvasElement {
  points: Point[] = []

  constructor() {
    super()

    events.on(EventListenerType.DRAW_START, (event, element) => {
      this.setPoint = getRealPoint([event.clientX, event.clientY, event.pressure], element)
    })
    events.on(EventListenerType.DRAWING, (event, element) => {
      this.setPoint = getRealPoint([event.clientX, event.clientY, event.pressure], element)

      this.Context.save()
      this.Context.scale(window.devicePixelRatio, window.devicePixelRatio)

      const path = new Path2D(getSvgPath(getStroke(this.points)))

      this.Context.fillStyle = this.color
      this.Context.fill(path)
      this.Context.restore()
    })
    events.on(EventListenerType.DRAW_END, (_, element) => {
      pipe(
        document.elementsFromPoint(this.points[0][0], this.points[0][1]),
        filter((element) => element !== (this.getRootNode() as ShadowRoot).host),
        head,
        (element) => {
          const range = document.createRange()

          range.selectNode(element!)

          return range
        },
        (range) => {
          events.emit(
            EventListenerType.POINTER_DROP,
            this.points,
            { color: this.color, range },
            element
          )
        }
      )

      this.points = []
    })
  }

  get color() {
    return this.getAttribute('color') as string
  }

  set setPoint(point: Point) {
    this.points = [...this.points, point]
  }
}

customElements.define('sketcha-sync-canvas', SyncCanvasElement, { extends: 'canvas' })
