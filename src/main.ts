import DependencyReplacer from './DependencyReplacer'
import Composer from './PackageManager/Composer'
import RubyGems from './PackageManager/RubyGems'
import Npm from './PackageManager/Npm'
import Pip from './PackageManager/Pip'
import * as $ from 'jquery'

const dependencyReplacer = new DependencyReplacer([
    new Composer(),
    new RubyGems(),
    new Npm(),
    new Pip(),
])

dependencyReplacer.replace($('.file')[0], window.location.href)
