import { JSDOM } from 'jsdom';
import * as fs from 'fs';
import { PackageManager } from '../src/PackageManager';
import { replaceDependencies } from '../src/replaceDependencies';
import { generatePackageLink } from '../src/generatePackageLink';

type TestCase = {
  packageManagerName: PackageManager;
  pathToHtml: string;
  pageUrl: string;
  validPackages: string[];
  invalidPackages: string[];
};

const testCases: TestCase[] = [
  {
    packageManagerName: 'composer',
    pathToHtml: '/fixtures/symfony_composer.json.html',
    pageUrl: 'https://github.com/symfony/symfony/blob/master/composer.json',
    validPackages: [
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
      'symfony/polyfill-php72'
    ],
    invalidPackages: ['php', 'ext-xml']
  },
  {
    packageManagerName: 'npm',
    pathToHtml: '/fixtures/react-draggable_package.json.html',
    pageUrl: 'https://github.com/mzabriskie/react-draggable/blob/master/package.json',
    validPackages: [
      'classnames',
      'prop-types',
      '@types/react',
      '@types/react-dom',
      'lodash',
      'webpack-dev-server'
    ],
    invalidPackages: ['lint', 'test']
  },
  {
    packageManagerName: 'npm',
    pathToHtml: '/fixtures/atari2600.js_package.json.html',
    pageUrl: 'https://github.com/star-collector/atari2600.js/blob/master/package.json',
    validPackages: [
      '@types/chai',
      '@types/karma',
      '@types/mocha',
      'chai',
      'karma',
      'karma-chai',
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-webpack',
      'mocha',
      'ts-loader',
      'typescript',
      'webpack',
      'webpack-cli'
    ],
    invalidPackages: ['devDependencies']
  },
  {
    packageManagerName: 'pip',
    pathToHtml: '/fixtures/flask_requirements.txt.html',
    pageUrl: 'https://github.com/pallets/flask/blob/master/docs/requirements.txt',
    validPackages: [
      'Sphinx~=1.8.0',
      'Pallets-Sphinx-Themes~=1.1.0',
      'sphinxcontrib-log-cabinet~=1.0.0'
    ],
    invalidPackages: [
      'test',
    ]
  },
  {
    packageManagerName: 'rubyGems',
    pathToHtml: '/fixtures/sinatra_Gemfile.html',
    pageUrl: 'https://github.com/sinatra/sinatra/blob/master/Gemfile',
    validPackages: [
      'rake',
      'rack',
      'rack-test',
      'minitest',
      'yard',
      'rack-protection',
      'sinatra-contrib',
      'liquid',
      'simplecov',
      'sass',
      'twitter-text',
      'rubysl-test-unit',
    ],
    invalidPackages: [
      'path',
      'jruby',
      'gem',
      'require',
      'false',
      'rbx',
      'RUBY_ENGINE',
      'if',
      'end',
      '1.14.7',
      'source',
      'gemspec',
      'unless',
    ]
  }
];

const getHtmlFileNode = (relativePath: string) => {
  const html = fs.readFileSync(__dirname + relativePath).toString();
  const dom = new JSDOM(html);
  const fileNode = dom.window.document.querySelector('div.file');
  if (!fileNode) {
    throw new Error('File node not found');
  }
  return fileNode;
};

describe('DependencyReplacer', () => {
  testCases.forEach(
    ({
      packageManagerName,
      pathToHtml,
      pageUrl,
      validPackages,
      invalidPackages
    }: TestCase) => {
      const dependencyFileNode = getHtmlFileNode(pathToHtml);
      replaceDependencies(dependencyFileNode, pageUrl);

      it(`should replace all ${packageManagerName} packages`, () => {
        validPackages.forEach(packageName => {
          expect(dependencyFileNode.innerHTML).toContain(
            generatePackageLink(packageManagerName, packageName)
          );
        });
      });

      it(`should ignore all non-${packageManagerName} packages`, () => {
        invalidPackages.forEach(packageName => {
          expect(dependencyFileNode.innerHTML).not.toContain(
            generatePackageLink(packageManagerName, packageName)
          );
        });
      });
    }
  );
});
