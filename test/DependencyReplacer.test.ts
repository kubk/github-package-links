import DependencyReplacer from '../src/DependencyReplacer'
import Composer from '../src/PackageManager/Composer'
import Pip from '../src/PackageManager/Pip'
import Npm from '../src/PackageManager/Npm'
import RubyGems from '../src/PackageManager/RubyGems'
const { JSDOM } = require('jsdom')
const fs = require('fs')

describe('DependencyReplacer', () => {
    const composer = new Composer()
    const npm = new Npm()
    const pip = new Pip()
    const rubyGems = new RubyGems()

    const dependencyReplacer = new DependencyReplacer([composer, npm, pip, rubyGems])

    getTestData().forEach(([ packageManagerName, pathToHtml, pageUrl, validPackages, invalidPackages ]) => {

        it(`replaces all ${packageManagerName} packages`, () => {
            const dependencyFileNode = getDependencyFileNode(pathToHtml)
            const packageManager = { composer, npm, pip, rubyGems }[packageManagerName]

            dependencyReplacer.replace(dependencyFileNode, pageUrl)

            validPackages.forEach(packageName => {
                expect(dependencyFileNode.innerHTML).toContain(packageManager.linkToPackage(packageName))
            })

            invalidPackages.forEach(packageName => {
                expect(dependencyFileNode.innerHTML).not.toContain(packageManager.linkToPackage(packageName))
            })
        })

    })
})

function getDependencyFileNode(relativePath) {
    const html = fs.readFileSync(__dirname + relativePath).toString()

    const dom = new JSDOM(html);

    return dom.window.document.querySelector('div.file')
}

function getTestData() {
    return [
        [
            'composer',
            '/fixtures/symfony_composer.json.html',
            'https://github.com/symfony/symfony/blob/master/composer.json',
            [
                'doctrine/common',
                'fig/link-util',
                'twig/twig',
                'psr/cache',
                'psr/container',
                'psr/link',
                'psr/log',
                'psr/simple-cache',
                'symfony/polyfill-intl-icu',
                'symfony/polyfill-mbstring',
                'symfony/polyfill-php72',
            ],
            [
                'php',
                'ext-xml'
            ]
        ],
        [
            'npm',
            '/fixtures/react-draggable_package.json.html',
            'https://github.com/mzabriskie/react-draggable/blob/master/package.json',
            [
                'classnames',
                'prop-types',
                '@types/react',
                '@types/react-dom',
                'lodash',
                'webpack-dev-server'
            ],
            [
                'lint',
                'test'
            ]
        ]
    ]
}
