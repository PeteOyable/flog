import Node from 'famous/core/Node'
import DOMElement from 'famous/dom-renderables/DOMElement'
import Transitionable from 'famous/transitions/Transitionable'
import Position from 'famous/components/Position'

class Article extends Node {
  constructor() {
    super()
    this.open = false

    this.element = new DOMElement(this, {
      classes : ['copied-article'],
      properties : {
        'background-color' : '#FFF'
      }
    })

    this
      .setSizeMode('relative', 'relative')
      .setMountPoint(0, 0)
      .setOrigin(0.5, 0)
      .setScale(0, 0)

    // this._openAnimation()
  }

  onReceive(event, payload) {
    console.log(event)
  }

  _openAnimation() {
    var positionTransition = new Transitionable()

    positionTransition.from(0).delay(600).to(1, 'linear', 200)

    var updatePosition = this.addComponent({
      onUpdate : (time) => {
        this.setScale(positionTransition.get(), positionTransition.get())

        if(positionTransition.isActive()) {
          this.requestUpdate(updatePosition)
        } else {
          var article = document.querySelector('.article')
          this.element.setContent(article.innerHTML)
        }
      }
    })

    this.requestUpdate(updatePosition)
  }

  _closeAnimation() {
    var positionTransition = new Transitionable()

    positionTransition.from(1).delay(600).to(0, 'linear', 200)

    var updatePosition = this.addComponent({
      onUpdate : (time) => {
        this.setScale(positionTransition.get(), positionTransition.get())

        if(positionTransition.isActive()) {
          this.requestUpdate(updatePosition)
        }
      }
    })

    this.requestUpdate(updatePosition)
  }
}

export default Article