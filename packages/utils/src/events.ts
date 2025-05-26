import { EventListenerType } from '@sketcha/constant'
import type { Point } from '@sketcha/types'
import EventEmitter from 'eventemitter3'

export type EventTypes = {
  [EventListenerType.DRAW_START]: [PointerEvent, HTMLCanvasElement]
  [EventListenerType.DRAWING]: [PointerEvent, HTMLCanvasElement]
  [EventListenerType.DRAW_END]: [PointerEvent, HTMLCanvasElement]
  [EventListenerType.TOUCH]: [TouchEvent, HTMLCanvasElement]
  [EventListenerType.POINT_DROP]: [Point[], HTMLCanvasElement]
  [EventListenerType.POINT_UP]: [Point[], HTMLCanvasElement]
  [EventListenerType.POINT_SELECT]: [Point[]]
  [EventListenerType.CLICK]: [PointerEvent, HTMLCanvasElement]
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
