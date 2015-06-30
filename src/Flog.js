import Node from 'famous/core/Node'
import Author from './Author'
import Article from './Article'

let authors = [
    { id : 0, name : 'Julien Boulevart', image : 'julien.jpg' },
    { id : 1, name : 'Nicolas Labbé', image : 'nico.jpg' },
    { id : 2, name : 'Fabrice Labbé', image : 'fabrice.jpg' },
    { id : 3, name : 'Fabien Logarinho', image : 'fabien.jpg' },
    { id : 4, name : 'John Doe', image : 'julien.jpg' },
    { id : 5, name : 'Eric Apple', image : 'nico.jpg' },
    { id : 6, name : 'Cindy Schmidt', image : 'fabrice.jpg' },
    { id : 7, name : 'Oli Sykes', image : 'fabien.jpg' }
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

  onSizeChange() {
    this.emit('window:resize', { width : window.innerWidth, countAuthors : authors.length })
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