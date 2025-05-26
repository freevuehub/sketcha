import { pipe, zip, map, append, toArray } from '@fxts/core'
import type { Point } from '@sketcha/types'

function getRealPoint([clientX, clientY, pressure]: Point, element: HTMLCanvasElement) {
  const { width, height, left, top } = element.getBoundingClientRect()

  return pipe(
    [left, top],
    zip([clientX, clientY]),
    map(([client, rect]) => client - rect),
    zip([element.width / (width * 2), element.height / (height * 2)]),
    map(([value, diff]) => value * diff),
    append(pressure),
    toArray
  ) as Point
}

export default getRealPoint
