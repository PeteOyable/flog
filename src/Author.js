import Node from 'famous/core/Node'
import DOMElement from 'famous/dom-renderables/DOMElement'
import Transitionable from 'famous/transitions/Transitionable'

class Author extends Node {
  constructor(options) {
    super()
    this.options = options
    this.even = (options.id%2) == 0
    this.hidden = false
    var radius = 60

    var element = new DOMElement(this, {
      classes : ['author'],
      properties : {
        'border-radius' : radius + 'px',
        'background-image' : 'url(images/' + options.image + ')',
        'background-size' : 'cover'
      }
    })

    this
      .setSizeMode('absolute', 'absolute')
      .setAbsoluteSize(radius, radius)
      .setOrigin(0.5, 0.5)
      .setMountPoint(0.5, 0.5)
      .setAlign(null, 0.5)
      .addUIEvent('click')

    this._startAnimation()
  }

  onReceive(event, payload) {
    if(event === 'article:open') {
      this._articleAnimation()
    }

    if(event === 'article:close') {
      this._articleAnimation()
    }

    if(event === 'window:resize') {
      var currentWidth = payload.width
      var countAuthors = payload.countAuthors
      var start = currentWidth/countAuthors
      var posX = (start * this.options.id) + (start/2) 
      this.setPosition(posX, null)
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

    if(this.hidden) {
      scaleTransition.from(0).delay(450).to(1, 'linear', 300)
    } else {
      scaleTransition.from(1).to(0, 'linear', 300)  
    }
    

    var updateScale = this.addComponent({
      onUpdate : (time) => {
        this.setScale(scaleTransition.get(), scaleTransition.get())

        if(scaleTransition.isActive()) {
          this.requestUpdate(updateScale)
        }
      }
    })

    this.hidden = !this.hidden

    this.requestUpdate(updateScale)
  }
}

export default Author