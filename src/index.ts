import { replaceDependencies } from './replace-dependencies';
import { waitForCondition } from './wait-for-condition';

const getGithubFileTabElement = () => {
  const selector = '.highlight.tab-size';
  return document.querySelector(selector);
};

const file = getGithubFileTabElement();
if (file) {
  replaceDependencies(file, window.location.href);
}

document.body.addEventListener('click', event => {
  const target = event.target as HTMLElement | null;
  if (!target) {
    return;
  }
  if (target.classList.contains('js-navigation-open')) {
    waitForCondition(getGithubFileTabElement, element => {
      replaceDependencies(element, window.location.href);
    });
  }
  const octotreeElement = target.closest('a[data-download-url]');
  if (octotreeElement instanceof HTMLAnchorElement && octotreeElement.dataset) {
    const { downloadUrl } = octotreeElement.dataset;
    if (!downloadUrl) {
      return;
    }
    waitForCondition(getGithubFileTabElement, element => {
      replaceDependencies(element, downloadUrl);
    });
  }
});
