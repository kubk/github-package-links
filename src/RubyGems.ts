import { PackageManager } from './PackageManager';
import * as $ from 'jquery';

export class RubyGems implements PackageManager {
  generatePackageLink(packageName: string): string | null {
    if (packageName.length < 1) {
      return null;
    }

    return 'https://rubygems.org/gems/' + packageName;
  }

  matchesPageUrl(url: string): boolean {
    return url.endsWith('Gemfile') || url.endsWith('gems.rb');
  }

  filterPackages(fileNode: Element): Element[] {
    return $(fileNode)
      .find('tr td.js-file-line:contains("gem "):not(:contains("#"))')
      .toArray();
  }
}
