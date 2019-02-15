import { findPackageManager } from './findPackageManager';
import { filterPackages } from './filterPackages';
import { generatePackageLink } from './generatePackageLink';

export const replaceDependencies = (fileNode: Element, pageUrl: string) => {
  const packageManager = findPackageManager(pageUrl);
  if (!packageManager) {
    return;
  }

  const linesWithDependencies = filterPackages(packageManager, fileNode);
  linesWithDependencies.forEach(line => {
    let packageNameWithQuotes = line.querySelector('.pl-s:first-child');
    if (!packageNameWithQuotes) {
      packageNameWithQuotes = line.querySelector('.blob-code-inner');
    }
    if (!packageNameWithQuotes || !packageNameWithQuotes.textContent) {
      // TODO: replace with 'return;'
      throw new Error('Should not be reached');
    }

    const packageName = packageNameWithQuotes.textContent.replace(/["']/g, '');
    const packageLink = generatePackageLink(packageManager, packageName);
    if (!packageLink) {
      return;
    }

    const linkHtml = buildLinkHtml(packageLink, packageName);
    packageNameWithQuotes.innerHTML = packageNameWithQuotes.outerHTML.replace(
      packageName,
      linkHtml
    );
  });
};

const buildLinkHtml = (packageLink: string, packageName: string): string => {
  const a = document.createElement('a');
  a.setAttribute('href', packageLink);
  a.setAttribute('target', '_blank');
  a.innerText = packageName;

  return a.outerHTML;
};
