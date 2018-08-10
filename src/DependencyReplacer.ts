import PackageManager from './PackageManager/PackageManager'
import * as $ from 'jquery'

export default class DependencyReplacer {
    constructor(private packageManagers: PackageManager[]) {}

    replace(fileNode: Element, pageUrl: string): void {
        const packageManager = this.getPackageManager(pageUrl)
        const linesWithDependencies = packageManager.getLinesWithPackages(fileNode)

        linesWithDependencies.forEach((line: Element) => {
            let $packageNameWithQuotes = $(line).find('.pl-s:first-child')

            if (!$packageNameWithQuotes.length) {
                $packageNameWithQuotes = $(line).find('.blob-code-inner')
            }

            const packageName = $packageNameWithQuotes.text().replace(/"|'/g, '')
            const packageLink = packageManager.linkToPackage(packageName)

            if (!packageLink) {
                return
            }

            const linkHtml = this.buildLinkHtml(packageLink, packageName)
            $packageNameWithQuotes.html($packageNameWithQuotes.html().replace(packageName, linkHtml))
        })
    }

    private getPackageManager(pageUrl: string): PackageManager {
        const packageManager = this.packageManagers.find(packageProvider => packageProvider.matchesPageUrl(pageUrl))

        if (!packageManager) {
            throw new Error()
        }

        return packageManager
    }

    private buildLinkHtml(packageLink: string, packageName: string): string {
        return $('<a>', { href: packageLink, target: '_blank', text: packageName })[0].outerHTML
    }
}
