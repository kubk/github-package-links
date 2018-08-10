import PackageManager from './PackageManager'
import * as $ from 'jquery'

export default class Composer implements PackageManager {
    linkToPackage(packageName: string): string {
        // Exclude PHP extensions such as 'ext-mbstring'
        if (packageName.search('/') === -1) {
            return
        }

        return 'https://packagist.org/packages/' + packageName
    }

    matchesPageUrl(url: string): boolean {
        return url.endsWith('composer.json')
    }

    getLinesWithPackages(fileNode: Element): Element[] {
        return $(fileNode).find('tr:contains("require")').nextUntil('tr:contains("}")').toArray()
    }
}