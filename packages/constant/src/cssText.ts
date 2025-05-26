export const ROOT_CSS_TEXT = `
  :host { display: block; }
  * {
    margin: 0;
    padding: 0;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
  }
  sketcha-canvas {
    display: block;
    width: 100%;
    height: 100%;
    touch-action: none;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
  }
`
