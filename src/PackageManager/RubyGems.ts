import PackageManager from './PackageManager'
import * as $ from 'jquery'

export default class RubyGems implements PackageManager {
    linkToPackage(packageName: string): string {
        if (packageName.length < 1) {
            return
        }

        return 'https://rubygems.org/gems/' + packageName
    }

    matchesPageUrl(url: string): boolean {
        return url.endsWith('Gemfile') || url.endsWith('gems.rb')
    }

    getLinesWithPackages(fileNode: Element): Element[] {
        return $(fileNode).find('tr td.js-file-line:contains("gem "):not(:contains("#"))').toArray()
    }
}