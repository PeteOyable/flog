import Node from 'famous/core/Node'
import DOMElement from 'famous/dom-renderables/DOMElement'

class Close extends Node {
  constructor(options) {
    super()

    var element = new DOMElement(this, {
      classes : ['close'],
      properties : {
        'font-size' : '22px',
        'font-weight' : 'bold',
        'cursor' : 'pointer'
      },
      content : 'x'
    })

    this
      .setSizeMode('absolute', 'absolute')
      .setPosition(window.innerWidth - 50, 30)
      .addUIEvent('click')
  }

  onReceive(event) {
    if(event === 'window:resize') {
      this.setPosition(window.innerWidth - 50, 30)
    }
  }
}

export default Close