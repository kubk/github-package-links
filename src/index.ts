import { replaceDependencies } from './replace-dependencies';
import { waitForCondition } from './wait-for-condition';

const getGithubFileTabElement = () => {
  return document.querySelector('.highlight.tab-size');
};

const file = getGithubFileTabElement();
if (file) {
  replaceDependencies(file, window.location.href);
}

document.body.addEventListener('click', event => {
  const target = event.target;
  if (target && target instanceof HTMLElement && target.classList.contains('js-navigation-open')) {
    waitForCondition(getGithubFileTabElement, element => {
      replaceDependencies(element, window.location.href);
    });
  }
});
