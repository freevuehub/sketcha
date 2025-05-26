import { isUndefined } from '@fxts/core'
import type { CanvasType } from '@sketcha/constant'

type Size = {
  width: number
  height: number
  ratio: number
}

function createCanvas(type: CanvasType, size: Size): HTMLCanvasElement
function createCanvas(type: CanvasType): (size?: Size) => HTMLCanvasElement

function createCanvas(type: CanvasType, size?: Size) {
  if (isUndefined(size)) return (currentSize: Size) => createCanvas(type, currentSize)

  const canvas = document.createElement('canvas')

  canvas.dataset.type = type
  canvas.width = size.width * size.ratio
  canvas.height = size.height * size.ratio
  canvas.style = `
    display: block;
    width: 100%;
    height: 100%;
  `

  return canvas
}

export default createCanvas
