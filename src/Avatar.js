import Node from 'famous/core/Node'
import DOMElement from 'famous/dom-renderables/DOMElement'
import Transitionable from 'famous/transitions/Transitionable'

var radius = 45

class Avatar extends Node {
  constructor() {
    super()
    this.element = new DOMElement(this, {
      classes : ['avatar'],
      properties : {
        'background-color' : '#bada55',
        'border-radius' : radius + 'px'
      }
    })

    this
      .setSizeMode('absolute', 'absolute')
      .setAbsoluteSize(radius, radius)
      .setAlign(0.5, 0)
      .setMountPoint(0.5, 0)
      .setOrigin(0.5, 0.5)
      .setPosition(null, 90)
      .setScale(0, 0)
  }

  onReceive(event, payload) {
    if(event === 'article:open') {
      this.element
        .setProperty('background-image', 'url(images/' + payload.image + ')')
        .setProperty('background-size', 'cover')
      this._startAnimation()
    }
  }

  _startAnimation() {
    var scaleTransition = new Transitionable()

    scaleTransition.from(0).delay(600).to(1, 'outExpo', 300)

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

export default Avatar;