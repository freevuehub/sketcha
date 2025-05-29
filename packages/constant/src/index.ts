export enum CanvasType {
  SYNC = 'sync',
  ASYNC = 'async',
}
export enum EventListenerType {
  DRAW_START = 'SKETCHA.DRAW.START',
  DRAWING = 'SKETCHA.DRAW.ING',
  DRAW_END = 'SKETCHA.DRAW.END',
  DRAW_CANCEL = 'SKETCHA.DRAW.CANCEL',
  POINTER_DROP = 'SKETCHA.POINTER.DROP',
  POINTER_UP = 'SKETCHA.POINTER.UP',
  POINTER_SELECT = 'SKETCHA.POINTER.SELECT',
  RESIZE_START = 'SKETCHA.RESIZE.START',
  RESIZE_ING = 'SKETCHA.RESIZE.ING',
  RESIZE_END = 'SKETCHA.RESIZE.END',
}

export * from './cssText'
export enum ErrorMessage {
  SKETCHA_NOT_INITIALIZED = 'Sketcha is not initialized',
  SKETCHA_SYNC_CANVAS_NOT_FOUND = 'Sketcha sync canvas is not found',
}
