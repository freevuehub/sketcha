import { EventListenerType } from '@sketcha/constant'
import type { Point, PointOption, WindowSize } from '@sketcha/types'
import EventEmitter from 'eventemitter3'

export type EventTypes = {
  [EventListenerType.DRAW_START]: [PointerEvent, HTMLCanvasElement]
  [EventListenerType.DRAWING]: [PointerEvent, HTMLCanvasElement]
  [EventListenerType.DRAW_END]: [PointerEvent, HTMLCanvasElement]
  [EventListenerType.POINTER_DROP]: [Array<Point>, PointOption, HTMLCanvasElement]
  [EventListenerType.POINTER_UP]: [Point[], HTMLCanvasElement]
  [EventListenerType.POINTER_SELECT]: [Point[]]
  [EventListenerType.RESIZE_START]: [WindowSize, Window]
  [EventListenerType.RESIZE_ING]: [WindowSize, Window]
  [EventListenerType.RESIZE_END]: [WindowSize, Window]
}

const eventEmitter = new EventEmitter()
const events = Object.freeze({
  on: <T extends keyof EventTypes>(
    eventName: T,
    fn: (...payload: EventTypes[T]) => void,
    context?: unknown
  ) => eventEmitter.on(eventName, fn, context),
  emit: <T extends keyof EventTypes>(eventName: T, ...payload: EventTypes[T]) =>
    eventEmitter.emit(eventName, ...payload),
})

export default events
