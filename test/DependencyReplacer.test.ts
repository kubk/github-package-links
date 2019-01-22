import {DependencyReplacer }from '../src/DependencyReplacer'
import {Composer} from '../src/Composer'
import {Pip} from '../src/Pip'
import {Npm} from '../src/Npm'
import {RubyGems} from '../src/RubyGems'
import {PackageManager} from "../src/PackageManager";
const { JSDOM } = require('jsdom');
const fs = require('fs');

describe('DependencyReplacer', () => {
    const composer = new Composer();
    const npm = new Npm();
    const pip = new Pip();
    const rubyGems = new RubyGems();

    const dependencyReplacer = new DependencyReplacer([composer, npm, pip, rubyGems]);

    getTestData().forEach(([ packageManagerName, pathToHtml, pageUrl, validPackages, invalidPackages ]) => {

        it(`replaces all ${packageManagerName} packages`, () => {
            const dependencyFileNode = getDependencyFileNode(pathToHtml);
            const packageManager: PackageManager = { composer, npm, pip, rubyGems }[packageManagerName];
            dependencyReplacer.replace(dependencyFileNode, pageUrl);

            validPackages.forEach(packageName => {
                expect(dependencyFileNode.innerHTML).toContain(packageManager.generatePackageLink(packageName))
            });

            invalidPackages.forEach(packageName => {
                expect(dependencyFileNode.innerHTML).not.toContain(packageManager.generatePackageLink(packageName))
            });
        })

    })
});

function getDependencyFileNode(relativePath: string) {
    const html = fs.readFileSync(__dirname + relativePath).toString();
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
        ],
        [
            'npm',
            '/fixtures/atari2600.js_package.json.html',
            'https://github.com/star-collector/atari2600.js/blob/master/package.json',
            [
                "@types/chai",
                "@types/karma",
                "@types/mocha",
                "chai",
                "karma",
                "karma-chai",
                "karma-chrome-launcher",
                "karma-mocha",
                "karma-webpack",
                "mocha",
                "ts-loader",
                "typescript",
                "webpack",
                "webpack-cli",
            ],
            [
                'devDependencies',
            ]
        ]
    ]
}
