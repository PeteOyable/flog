'use strict'

// Famous dependencies
import FamousEngine from 'famous/core/FamousEngine'

// Our dependencies
import Author from './Author'
import Article from './Article'

let authors = [
    { id : 0, name : 'Julien Boulevart', image : '' },
    { id : 1, name : 'Nicolas Labbé', image : '' },
    { id : 2, name : 'Fabrice Labbé', image : '' }
]

// Initialize with a scene; then, add a 'node' to the scene root
var sceneAuthor = FamousEngine.createScene('.authors').addChild()
var sceneArticle = FamousEngine.createScene('.articles')

for(var i = 0; i < authors.length; i++) {
    new Author(sceneAuthor.addChild(), authors[i])
}

new Article(sceneArticle)

FamousEngine.init()