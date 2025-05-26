import { CanvasType, EventListenerType } from '@sketcha/constant'
import HTMLCanvasElement from './Common'
import { getStroke, events, getSvgPath } from '@sketcha/utils'
import type { Point } from '@sketcha/types'

class AsyncCanvasElement extends HTMLCanvasElement {
  points: Point[] = []

  constructor() {
    super()

    this.render(CanvasType.ASYNC)

    events.on(EventListenerType.POINT_DROP, (points) => {
      this.points = points

      this.Context?.save()
      this.Context?.scale(window.devicePixelRatio, window.devicePixelRatio)

      const path = new Path2D(getSvgPath(getStroke(this.points)))

      this.Context?.fill(path)
      this.Context?.restore()
    })
  }
}

customElements.define('sketcha-async-canvas', AsyncCanvasElement)
