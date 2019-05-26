import { PackageManager } from './package-manager';

export const filterPackages = (
  packageManager: PackageManager,
  fileNode: Element
): Element[] => {
  switch (packageManager) {
    case PackageManager.Composer:
      const composerRows = Array.from<Element>(fileNode.querySelectorAll('tr'));
      return composerRows.reduce<Element[]>((elements, line) => {
        if (line.textContent && line.textContent.includes('require')) {
          return elements.concat(nextSiblingsUntilText(line, '}'));
        }
        return elements;
      }, []);
    case PackageManager.Npm:
      const npmRows = Array.from<Element>(fileNode.querySelectorAll('tr'));
      return npmRows.reduce<Element[]>((elements, line) => {
        if (line.textContent && line.textContent.includes('ependencies')) {
          return elements.concat(nextSiblingsUntilText(line, '}'));
        }
        return elements;
      }, []);
    case PackageManager.RubyGems:
      return Array.from(fileNode.querySelectorAll('tr td.js-file-line')).filter(
        line => {
          return (
            line.textContent &&
            line.textContent.includes('gem ') &&
            !line.textContent.includes('#')
          );
        }
      );
    case PackageManager.Gopkg:
      return Array.from(fileNode.querySelectorAll('tr')).filter(line => {
        return (
          line.textContent &&
          line.textContent.includes('name = "github.com/') &&
          !line.textContent.includes('#')
        );
      });
    case PackageManager.Pip:
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
