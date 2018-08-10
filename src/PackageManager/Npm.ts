import PackageManager from './PackageManager'
import * as $ from 'jquery'

export default class Npm implements PackageManager {
    linkToPackage(packageName: string): string {
        return 'https://www.npmjs.com/package/' + packageName
    }

    matchesPageUrl(url: string): boolean {
        return url.endsWith('package.json') || url.endsWith('bower.json')
    }

    getLinesWithPackages(fileNode: Element): Element[] {
        return $(fileNode).find('tr:contains("ependencies")').nextUntil('tr:contains("}")').toArray()
    }
}