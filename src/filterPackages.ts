import { PackageManager } from './PackageManager';

export const filterPackages = (
  packageManager: PackageManager,
  fileNode: Element
): Element[] => {
  switch (packageManager) {
    case 'composer':
      return Array
        .from<Element>(fileNode.querySelectorAll('tr'))
        .reduce<Element[]>((elements, line) => {
          if (line.textContent && line.textContent.includes('require')) {
            return elements.concat(nextSiblingsUntilText(line, '}'));
          }
          return elements;
        }, []);
    case 'npm':
      return Array
        .from<Element>(fileNode.querySelectorAll('tr'))
        .reduce<Element[]>((elements, line) => {
          if (line.textContent && line.textContent.includes('ependencies')) {
            return elements.concat(nextSiblingsUntilText(line, '}'));
          }
          return elements;
        }, []);
    case 'rubyGems':
      return Array
        .from(fileNode.querySelectorAll('tr td.js-file-line'))
        .filter(line => {
          return (
            line.textContent &&
            line.textContent.includes('gem ') &&
            !line.textContent.includes('#')
          );
        }
      );
    case 'pip':
      return Array.from(fileNode.querySelectorAll('tr'));
  }
};

const nextSiblingsUntilText = (element: Element, text: string): Element[] => {
  const siblings = [];
  while (element.nextElementSibling) {
    if (element.textContent && element.textContent.includes(text)) {
      break;
    }
    siblings.push(element);
    element = element.nextElementSibling;
  }
  return siblings;
};
