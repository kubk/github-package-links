import { PackageManager } from './PackageManager';
import * as $ from 'jquery';

export class Pip implements PackageManager {
  generatePackageLink(packageName: string): string | null {
    if (packageName.length < 1 || packageName.startsWith('git+')) {
      return null;
    }

    const shortPackageNames = packageName.match(/^\w+/);
    if (!shortPackageNames) {
      return null;
    }

    return 'https://pypi.python.org/pypi/' + shortPackageNames[0];
  }

  matchesPageUrl(url: string): boolean {
    // Match requirements.dev.txt, requirements.test.txt
    return /requirements.*txt$/.test(url);
  }

  filterPackages(fileNode: Element): Element[] {
    return $(fileNode)
      .find('tr')
      .toArray();
  }
}
