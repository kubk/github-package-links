import { replaceDependencies } from './replaceDependencies';
import { waitForElement } from './waitForElement';

const file = document.querySelector('.file');
if (file) {
  replaceDependencies(file, window.location.href);
}

document.body.addEventListener('click', event => {
  if (
    event.target &&
    (<HTMLElement>event.target).classList.contains('js-navigation-open')
  ) {
    let attempt = 0;
    waitForElement('.file', attempt, element => {
      replaceDependencies(element, window.location.href);
    });
  }
});
