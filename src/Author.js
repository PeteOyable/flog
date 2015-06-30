import Node from 'famous/core/Node'
import DOMElement from 'famous/dom-renderables/DOMElement'
import Transitionable from 'famous/transitions/Transitionable'
import Position from 'famous/components/Position'

var radius = 60
var marginLeft = 30
var currentWidth = window.innerWidth

class Author extends Node {
  constructor(options) {
    super()
    this.options = options
    this.even = (options.id%2) == 0

    var element = new DOMElement(this, {
      classes : ['author'],
      properties : {
        'background-color' : '#bada55',
        'border-radius' : radius + 'px'
      }
    })

    this
      .setSizeMode('absolute', 'absolute')
      .setAbsoluteSize(radius, radius)
      .setOrigin(0.5, 0.5)
      .addUIEvent('click')

    this._startAnimation()
  }

  onSizeChange() {
    currentWidth = window.innerWidth
    var posX = (currentWidth/2) - (radius/2) + ((marginLeft+radius) * this.options.id) - (marginLeft+radius)
    this.setPosition(posX, null)
  }

  onReceive(event, payload) {
    if(event === 'article:open') {
      this._articleAnimation()
    }
  }

  _startAnimation() {
    var positionTransition = new Transitionable()
    var opacityTransition = new Transitionable()

    var posY = this.even ? 0.4 : 0.6

    positionTransition.from(posY).delay(600).to(0.5, 'easeOutBounce', 200)
    opacityTransition.from(0).delay(600).to(1, 'linear', 200)

    var updatePosition = this.addComponent({
      onUpdate : (time) => {
        this.setAlign(0, positionTransition.get(), 0.5)

        if(positionTransition.isActive()) {
          this.requestUpdate(updatePosition)
        }
      }
    })

    var updateOpacity = this.addComponent({
      onUpdate : () => {
        this.setOpacity(opacityTransition.get())

        if(opacityTransition.isActive()) {
          this.requestUpdate(updateOpacity)
        }
      }
    })

    this.requestUpdate(updatePosition)
    this.requestUpdate(updateOpacity)
  }

  _articleAnimation() {
    var scaleTransition = new Transitionable()
    scaleTransition.from(1).to(0, 'linear', 300)

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

export default Author