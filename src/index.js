'use strict'

// Famous dependencies
import FamousEngine from 'famous/core/FamousEngine'

// Our dependencies
import Author from './Author'

let authors = [
    { id : 0, name : 'Julien Boulevart', image : '' },
    { id : 1, name : 'Nicolas Labbé', image : '' },
    { id : 2, name : 'Fabrice Labbé', image : '' }
]

// Initialize with a scene; then, add a 'node' to the scene root
var scene = FamousEngine.createScene().addChild()

for(var i = 0; i < authors.length; i++) {
    new Author(scene.addChild(), authors[i])
}

FamousEngine.init()