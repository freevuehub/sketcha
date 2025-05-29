import { isNull, isUndefined, pipe, throwIf } from '@fxts/core'
import { ROOT_CSS_TEXT, CanvasType, ErrorMessage } from '@sketcha/constant'

import './components'

type Props = {
  element: HTMLElement
}

class Sketcha {
  private shadowRoot: ShadowRoot | null = null

  color: string = '#aaaaaa'

  constructor(props: Props) {
    pipe(
      props.element,
      throwIf(isUndefined, () => Error('')),
      (element) => {
        element.style.position = 'relative !important'

        const createWrapper = document.createElement('div')

        createWrapper.style.position = 'relative !important'
        createWrapper.id = 'sketcha-wrapper'

        element.append(createWrapper)

        return createWrapper
      },
      (element) => element.attachShadow({ mode: 'closed' }),
      (shadowRoot) => {
        const styleSheet = new CSSStyleSheet()

        styleSheet.replaceSync(ROOT_CSS_TEXT)

        shadowRoot.adoptedStyleSheets = [styleSheet]
        shadowRoot.innerHTML = `
          <sketcha-canvas>
            <canvas is="sketcha-async-canvas" type="${CanvasType.ASYNC}"></canvas>
            <canvas is="sketcha-sync-canvas" color="${this.color}" type="${CanvasType.SYNC}"></canvas>
          </sketcha-canvas>
        `

        this.shadowRoot = shadowRoot
      }
    )
  }

  set setColor(color: string) {
    try {
      pipe(
        this.shadowRoot,
        throwIf(isNull, () => Error(ErrorMessage.SKETCHA_NOT_INITIALIZED)),
        (root) => root.querySelector(`canvas[type="${CanvasType.SYNC}"]`),
        throwIf(isNull, () => Error(ErrorMessage.SKETCHA_SYNC_CANVAS_NOT_FOUND)),
        (element) => {
          element.setAttribute('color', color)
        }
      )
    } catch (error) {
      console.error(error)
    } finally {
      this.color = color
    }
  }
}

export default Sketcha
