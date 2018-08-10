import IPackageManager from './IPackageManager';
import * as $ from 'jquery';

export default class RubyGems implements IPackageManager {
    public generatePackageLink(packageName: string): string | null {
        if (packageName.length < 1) {
            return null;
        }

        return 'https://rubygems.org/gems/' + packageName;
    }

    public matchesPageUrl(url: string): boolean {
        return url.endsWith('Gemfile') || url.endsWith('gems.rb');
    }

    public filterPackages(fileNode: Element): Element[] {
        return $(fileNode).find('tr td.js-file-line:contains("gem "):not(:contains("#"))').toArray();
    }
}
