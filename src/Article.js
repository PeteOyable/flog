import Node from 'famous/core/Node'
import DOMElement from 'famous/dom-renderables/DOMElement'
import Transitionable from 'famous/transitions/Transitionable'
import Position from 'famous/components/Position'

import Avatar from './Avatar'

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

    this.addChild(new Avatar())

    this
      .setSizeMode('relative', 'relative')
      .setMountPoint(0, 0)
      .setOrigin(0.5, 0.5)
      .setScale(0, 0)

    // this._openAnimation()
  }

  onReceive(event, payload) {
    if(event === 'article:open') {
      this._openAnimation(payload)
    }
  }

  _openAnimation(options) {
    var scaleTransition = new Transitionable()

    scaleTransition.from(0).delay(300).to(1, 'linear', 300)

    var updateScale = this.addComponent({
      onUpdate : (time) => {
        this.setScale(scaleTransition.get(), scaleTransition.get())

        if(scaleTransition.isActive()) {
          this.requestUpdate(updateScale)
        } else {
          var article = document.querySelector('.article')
          var author = article.querySelector('.author-name')
          author.innerText = options.name
          this.element.setContent(article.innerHTML)
        }
      }
    })

    this.requestUpdate(updateScale)
  }

  _closeAnimation() {
    var scaleTransition = new Transitionable()

    scaleTransition.from(1).delay(600).to(0, 'linear', 200)

    var updateScale = this.addComponent({
      onUpdate : (time) => {
        this.setScale(scaleTransition.get(), scaleTransition.get())

        if(scaleTransition.isActive()) {
          this.requestUpdate(updateScale)
        }
      }
    })

    this.requestUpdate(updateScale)
  }
}

export default Article