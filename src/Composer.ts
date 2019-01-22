import { PackageManager } from './PackageManager';
import * as $ from 'jquery';

export class Composer implements PackageManager {
  generatePackageLink(packageName: string): string | null {
    // Exclude PHP extensions such as 'ext-json'
    if (packageName.search('/') === -1) {
      return null;
    }

    return 'https://packagist.org/packages/' + packageName;
  }

  matchesPageUrl(url: string): boolean {
    return url.endsWith('composer.json');
  }

  filterPackages(fileNode: Element): Element[] {
    return $(fileNode)
      .find('tr:contains("require")')
      .nextUntil('tr:contains("}")')
      .toArray();
  }
}
