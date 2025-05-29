import { CanvasType, EventListenerType } from '@sketcha/constant'
import HTMLCanvasElement from './Common'
import { getStroke, events, getSvgPath } from '@sketcha/utils'
import type { Point, PointsGroup } from '@sketcha/types'

class AsyncCanvasElement extends HTMLCanvasElement {
  pointsGroup: Map<string, PointsGroup> = new Map()

  constructor() {
    super()

    this.style.pointerEvents = 'none'

    events.on(EventListenerType.POINTER_DROP, (points, option) => {
      this.setPoints = { points, option }

      this.Context.save()
      this.Context.scale(window.devicePixelRatio, window.devicePixelRatio)

      const path = new Path2D(getSvgPath(getStroke(points)))

      this.Context.fillStyle = option.color
      this.Context.fill(path)
      this.Context.restore()
    })

    window.addEventListener('resize', () => {
      this.Context.save()
      this.Context.scale(window.devicePixelRatio, window.devicePixelRatio)
    })
  }

  get getUUID() {
    return Math.random().toString(36).substring(2, 15)
  }

  set setPoints(value: PointsGroup) {
    this.pointsGroup.set(this.getUUID, value)
  }
}

customElements.define('sketcha-async-canvas', AsyncCanvasElement, { extends: 'canvas' })
