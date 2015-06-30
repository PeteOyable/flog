// Famous dependencies
import FamousEngine from 'famous/core/FamousEngine'

// Our dependencies
import Flog from './Flog'

FamousEngine.init()

var scene = FamousEngine.createScene().addChild(new Flog())