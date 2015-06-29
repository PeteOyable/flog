'use strict'

import DOMElement from 'famous/dom-renderables/DOMElement'
import Transitionable from 'famous/transitions/Transitionable'

var radius = 60
var marginLeft = 30
var currentWidth = window.innerWidth

class Author {
  constructor(node, options) {
    this.node = node
    this.options = options
    this.even = (options.id%2) == 0

    var element = new DOMElement(node, {
      classes : ['author'],
      properties : {
        'background-color' : '#bada55',
        'border-radius' : radius + 'px'
      }
    })

    node
      .setSizeMode('absolute', 'absolute')
      .setAbsoluteSize(radius, radius)
      .addUIEvent('click')

    this._setSizeChanged()
    this._startAnimation()
    this._dispatchEvent()
  }

  _setSizeChanged() {
    this.node.getParent().addComponent({
      onSizeChange : (size) => {
        currentWidth = size
        var posX = (currentWidth/2) - (radius/2) + ((marginLeft+radius) * this.options.id) - (marginLeft+radius)
        this.node.setPosition(posX, null)
      }
    })
  }

  _startAnimation() {
    var positionTransition = new Transitionable()
    var opacityTransition = new Transitionable()

    var posY = this.even ? 0.4 : 0.6

    positionTransition.from(posY).delay(600).to(0.5, 'easeOutBounce', 200)
    opacityTransition.from(0).delay(600).to(1, 'linear', 200)

    var updatePosition = this.node.addComponent({
      onUpdate : (time) => {
        this.node.setAlign(0, positionTransition.get(), 0.5)

        if(positionTransition.isActive()) {
          this.node.requestUpdate(updatePosition)
        }
      }
    })

    var updateOpacity = this.node.addComponent({
      onUpdate : () => {
        this.node.setOpacity(opacityTransition.get())

        if(opacityTransition.isActive()) {
          this.node.requestUpdate(updateOpacity)
        }
      }
    })

    this.node.requestUpdate(updatePosition)
    this.node.requestUpdate(updateOpacity)
  }

  _dispatchEvent() {
    this.node.addComponent({
      onReceive: (type, payload) => {
        console.log(type)
        if(type === 'click') {
          console.log(payload)
          this.node.emit('article', this.options)
        }
      }
    })
  }
}

export default Author