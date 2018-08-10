import IPackageManager from './IPackageManager';
import * as $ from 'jquery';

export default class Composer implements IPackageManager {
    public generatePackageLink(packageName: string): string | null {
        // Exclude PHP extensions such as 'ext-json'
        if (packageName.search('/') === -1) {
            return null;
        }

        return 'https://packagist.org/packages/' + packageName;
    }

    public matchesPageUrl(url: string): boolean {
        return url.endsWith('composer.json');
    }

    public filterPackages(fileNode: Element): Element[] {
        return $(fileNode).find('tr:contains("require")').nextUntil('tr:contains("}")').toArray();
    }
}
