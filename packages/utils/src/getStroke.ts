import { getStroke as stroke } from 'perfect-freehand'
import type { Point } from '@sketcha/types'

function getStroke(points: Point[]) {
  return stroke(points, {
    simulatePressure: false,
    smoothing: 0.7,
    start: {
      taper: 0,
      cap: true,
    },
    end: {
      taper: 0,
      cap: true,
    },
  }) as Point[]
}

export default getStroke
