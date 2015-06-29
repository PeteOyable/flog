'use strict'

import DOMElement from 'famous/dom-renderables/DOMElement'
import Transitionable from 'famous/transitions/Transitionable'
import Position from 'famous/components/Position'

class Article {
  constructor(node, options) {
    this.node = node
    this.options = options
    this.open = false
    this.nodeElement = node.addChild()

    this.element = new DOMElement(this.nodeElement, {
      classes : ['copied-article'],
      properties : {
        'background-color' : '#FFF'
      }
    })

    node
      .setSizeMode('absolute', 'absolute')
      .setMountPoint(0, 0)
      .setOrigin(0.5, 0)
      .setScale(0, 0)

    this._openAnimation()
    this._handleEvents()
  }

  _openAnimation() {
    var positionTransition = new Transitionable()

    positionTransition.from(0).delay(600).to(1, 'linear', 200)

    var updatePosition = this.node.addComponent({
      onUpdate : (time) => {
        this.node.setScale(positionTransition.get(), positionTransition.get())

        if(positionTransition.isActive()) {
          this.node.requestUpdate(updatePosition)
        } else {
          var article = document.querySelector('.article')
          this.element.setContent(article.innerHTML)
        }
      }
    })

    this.node.requestUpdate(updatePosition)
  }

  _closeAnimation() {
    var positionTransition = new Transitionable()

    positionTransition.from(1).delay(600).to(0, 'linear', 200)

    var updatePosition = this.node.addComponent({
      onUpdate : (time) => {
        this.node.setScale(positionTransition.get(), positionTransition.get())

        if(positionTransition.isActive()) {
          this.node.requestUpdate(updatePosition)
        }
      }
    })

    this.node.requestUpdate(updatePosition)
  }

  _handleEvents() {
    this.node.addComponent({
      onReceive: (type, payload) => {
        console.log(type, payload)
      }
    })
  }
}

export default Article