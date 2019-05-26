import { replaceDependencies } from './replace-dependencies';
import { waitForElement } from './wait-for-element';

const packageSelector = '.highlight.tab-size';
const file = document.querySelector(packageSelector);
if (file) {
  replaceDependencies(file, window.location.href);
}

document.body.addEventListener('click', event => {
  const target = event.target as HTMLElement | null;
  if (target && target.classList.contains('js-navigation-open')) {
    waitForElement(packageSelector, element => {
      replaceDependencies(element, window.location.href);
    });
  }
});
