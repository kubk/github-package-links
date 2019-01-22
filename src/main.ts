import { DependencyReplacer } from './DependencyReplacer';
import { Composer } from './Composer';
import { RubyGems } from './RubyGems';
import { Npm } from './Npm';
import { Pip } from './Pip';
import * as $ from 'jquery';

const dependencyReplacer = new DependencyReplacer([
  new Composer(),
  new RubyGems(),
  new Npm(),
  new Pip()
]);

type waitForElementHandler = (el: JQuery<HTMLElement>) => void;

const waitForElement = (selector: string, callback: waitForElementHandler) => {
  const $element = $(selector);
  if ($element.length) {
    callback($element);
  } else {
    setTimeout(() => {
      waitForElement(selector, callback);
    }, 100);
  }
};

const $file = $('.file');
if ($file.length) {
  dependencyReplacer.replace($file[0], window.location.href);
}

$(document.body).on('click', '.js-navigation-open', () => {
  waitForElement('.file', ($element: JQuery<HTMLElement>) => {
    dependencyReplacer.replace($element[0], window.location.href);
  });
});
