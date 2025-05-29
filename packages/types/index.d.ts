export type Point = [number, number, number]
export type PointOption = {
  color: string
  range: Range
}
export type PointsGroup = {
  points: Array<Point>
  option: PointOption
}
export type WindowSize = {
  width: number
  height: number
  ratio: number
}
