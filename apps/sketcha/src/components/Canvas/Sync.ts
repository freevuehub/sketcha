import { EventListenerType, CanvasType } from '@sketcha/constant'
import HTMLCanvasElement from './Common'
import { getStroke, events, getRealPoint, getSvgPath } from '@sketcha/utils'
import type { Point } from '@sketcha/types'

class SyncCanvasElement extends HTMLCanvasElement {
  points: Point[] = []

  constructor() {
    super()

    this.render(CanvasType.SYNC)

    events.on(EventListenerType.DRAW_START, (event, element) => {
      this.setPoint = getRealPoint([event.clientX, event.clientY, event.pressure], element)
    })
    events.on(EventListenerType.DRAWING, (event, element) => {
      this.setPoint = getRealPoint([event.clientX, event.clientY, event.pressure], element)

      this.Context?.save()
      this.Context?.scale(window.devicePixelRatio, window.devicePixelRatio)

      const path = new Path2D(getSvgPath(getStroke(this.points)))

      this.Context?.fill(path)
      this.Context?.restore()
    })
    events.on(EventListenerType.DRAW_END, (_, element) => {
      events.emit(EventListenerType.POINT_DROP, this.points, element)

      this.points = []
    })
  }

  set setPoint(point: Point) {
    this.points = [...this.points, point]
  }
}

customElements.define('sketcha-sync-canvas', SyncCanvasElement)
