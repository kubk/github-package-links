import IPackageManager from './IPackageManager';
import * as $ from 'jquery';

export default class Npm implements IPackageManager {
    public generatePackageLink(packageName: string): string | null {
        if (packageName === 'devDependencies') {
            return null;
        }

        return 'https://www.npmjs.com/package/' + packageName;
    }

    public matchesPageUrl(url: string): boolean {
        return url.endsWith('package.json') || url.endsWith('bower.json');
    }

    public filterPackages(fileNode: Element): Element[] {
        return $(fileNode).find('tr:contains("ependencies")').nextUntil('tr:contains("}")').toArray();
    }
}
