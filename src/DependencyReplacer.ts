import { PackageManager } from './PackageManager';
import * as $ from 'jquery';

export class DependencyReplacer {
  constructor(private packageManagers: PackageManager[]) {}

  replace(fileNode: Element, pageUrl: string): void {
    const packageManager = this.packageManagers.find(
      (manager: PackageManager) => manager.matchesPageUrl(pageUrl)
    );
    if (!packageManager) {
      return;
    }

    const linesWithDependencies = packageManager.filterPackages(fileNode);

    linesWithDependencies.forEach((line: Element) => {
      let $packageNameWithQuotes = $(line).find('.pl-s:first-child');
      if (!$packageNameWithQuotes.length) {
        $packageNameWithQuotes = $(line).find('.blob-code-inner');
      }

      const packageName = $packageNameWithQuotes.text().replace(/["']/g, '');
      const packageLink = packageManager.generatePackageLink(packageName);
      if (!packageLink) {
        return;
      }

      const linkHtml = this.buildLinkHtml(packageLink, packageName);
      $packageNameWithQuotes.html(
        $packageNameWithQuotes.html().replace(packageName, linkHtml)
      );
    });
  }

  private buildLinkHtml(packageLink: string, packageName: string): string {
    const a = document.createElement('a');
    a.setAttribute('href', packageLink);
    a.setAttribute('target', '_blank');
    a.innerText = packageName;

    return a.outerHTML;
  }
}
