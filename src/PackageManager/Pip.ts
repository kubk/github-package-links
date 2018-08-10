import PackageManager from './PackageManager'
import * as $ from 'jquery'

export default class Pip implements PackageManager {
    linkToPackage(packageName: string): string {
        if (packageName.length < 1 || packageName.startsWith('git+')) {
            return
        }

        return 'https://pypi.python.org/pypi/' + packageName.match(/^\w+/)[0]
    }

    matchesPageUrl(url: string): boolean {
        // Match requirements.dev.txt, requirements.test.txt
        return /requirements.*txt$/.test(url)
    }

    getLinesWithPackages(fileNode: Element): Element[] {
        return $(fileNode).find('tr').toArray()
    }
}