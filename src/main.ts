import DependencyReplacer from './DependencyReplacer';
import Composer from './Composer';
import RubyGems from './RubyGems';
import Npm from './Npm';
import Pip from './Pip';
import * as $ from 'jquery';

const dependencyReplacer = new DependencyReplacer([
    new Composer(),
    new RubyGems(),
    new Npm(),
    new Pip(),
]);

dependencyReplacer.replace($('.file')[0], window.location.href);
