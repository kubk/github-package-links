import { replaceDependencies } from './replaceDependencies';
import { waitForElement } from './waitForElement';

const file = document.querySelector('.file');
if (file) {
  replaceDependencies(file, window.location.href);
}

document.body.addEventListener('click', event => {
  if (
    event.target &&
    (event.target as HTMLElement).classList.contains('js-navigation-open')
  ) {
    const attempt = 0;
    waitForElement('.file', attempt, element => {
      replaceDependencies(element, window.location.href);
    });
  }
});
