import { PackageManager } from './PackageManager';
import * as $ from 'jquery';

export class Npm implements PackageManager {
  generatePackageLink(packageName: string): string | null {
    if (packageName === 'devDependencies') {
      return null;
    }

    return 'https://www.npmjs.com/package/' + packageName;
  }

  matchesPageUrl(url: string): boolean {
    return url.endsWith('package.json') || url.endsWith('bower.json');
  }

  filterPackages(fileNode: Element): Element[] {
    return $(fileNode)
      .find('tr:contains("ependencies")')
      .nextUntil('tr:contains("}")')
      .toArray();
  }
}
