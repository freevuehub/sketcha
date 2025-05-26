import { isUndefined, pipe, throwIf } from '@fxts/core'
import { ROOT_CSS_TEXT } from '@sketcha/constant'

import './components'

type Props = {
  element: HTMLElement
}

class Sketcha {
  constructor(props: Props) {
    pipe(
      props.element,
      throwIf(isUndefined, () => Error('')),
      (element) => {
        element.innerHTML = ''

        return element
      },
      (element) => element.attachShadow({ mode: 'open' }),
      (shadowRoot) => {
        const styleSheet = new CSSStyleSheet()

        styleSheet.replaceSync(ROOT_CSS_TEXT)

        shadowRoot.adoptedStyleSheets = [styleSheet]
        shadowRoot.innerHTML = `<sketcha-canvas></sketcha-canvas>`
      }
    )
  }
}

export default Sketcha
