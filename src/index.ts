import { replaceDependencies } from './replaceDependencies';
import { waitForElement } from './waitForElement';

const packageSelector = '.highlight.tab-size';
const file = document.querySelector(packageSelector);
if (file) {
  replaceDependencies(file, window.location.href);
}

document.body.addEventListener('click', event => {
  const target = event.target as HTMLElement | null;
  if (target && target.classList.contains('js-navigation-open')) {
    const attempt = 0;
    waitForElement(packageSelector, attempt, element => {
      replaceDependencies(element, window.location.href);
    });
  }
});
