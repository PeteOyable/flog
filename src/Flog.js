import Node from 'famous/core/Node'
import Author from './Author'
import Article from './Article'

let authors = [
    { id : 0, name : 'Julien Boulevart', image : '' },
    { id : 1, name : 'Nicolas Labbé', image : '' },
    { id : 2, name : 'Fabrice Labbé', image : '' },
    // { id : 3, name : 'Fabien Logarinho', image : '' }
]

class Flog extends Node {
  constructor() {
    super()
    this.createAuthors()
    this.createArticle()
  }

  onReceive(event, payload) {
    if(event === 'click') {
      if(payload.node instanceof Author) {
        this.emit('article:open', payload.node.options)
      } else {
        this.emit('article:close')
      }
    }
  }

  createAuthors() {
    for(var i = 0; i < authors.length; i++) {
      this.addChild(new Author(authors[i]))
    }
  }

  createArticle() {
    this.addChild(new Article())
  }
}

export default Flog;