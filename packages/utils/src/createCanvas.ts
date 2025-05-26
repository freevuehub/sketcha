import type { CanvasType } from '@sketcha/constant'

type Size = {
  width: number
  height: number
  ratio: number
}

function createCanvas(type: CanvasType) {
  return ({ width, height, ratio }: Size) => {
    const canvas = document.createElement('canvas')

    canvas.dataset.type = type
    canvas.width = width * ratio
    canvas.height = height * ratio
    canvas.style = `
      display: block;
      width: 100%;
      height: 100%;
    `

    return canvas
  }
}

export default createCanvas
