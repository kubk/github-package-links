import { JSDOM } from 'jsdom';
import * as fs from 'fs';
import { PackageManager } from '../src/types';
import { replaceDependencies } from '../src/replace-dependencies';
import { generatePackageLink } from '../src/generate-package-link';

interface TestCase {
  packageManagerName: PackageManager;
  pathToHtml: string;
  pageUrl: string;
  validPackages: string[];
  invalidPackages: string[];
}

const testCases: TestCase[] = [
  {
    packageManagerName: PackageManager.Composer,
    pathToHtml: __dirname + '/fixtures/symfony_composer.json.html',
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
    packageManagerName: PackageManager.Npm,
    pathToHtml: __dirname + '/fixtures/react-draggable_package.json.html',
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
    packageManagerName: PackageManager.Npm,
    pathToHtml: __dirname + '/fixtures/atari2600.js_package.json.html',
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
    packageManagerName: PackageManager.Pip,
    pathToHtml: __dirname + '/fixtures/flask_requirements.txt.html',
    pageUrl:
      'https://github.com/pallets/flask/blob/master/docs/requirements.txt',
    validPackages: [
      'Sphinx~=1.8.0',
      'Pallets-Sphinx-Themes~=1.1.0',
      'sphinxcontrib-log-cabinet~=1.0.0'
    ],
    invalidPackages: ['test']
  },
  {
    packageManagerName: PackageManager.RubyGems,
    pathToHtml: __dirname + '/fixtures/sinatra_Gemfile.html',
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
      'rubysl-test-unit'
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
      'unless'
    ]
  },
  {
    packageManagerName: PackageManager.Gopkg,
    pathToHtml: __dirname + '/fixtures/example_Gopkg.toml.html',
    invalidPackages: ['version', 'constraint'],
    validPackages: [
      'github.com/spf13/cobra',
      'github.com/spf13/viper',
      'github.com/go-telegram-bot-api/telegram-bot-api'
    ],
    pageUrl: 'https://github.com/makasim/telegram-bot-cli/blob/master/Gopkg.toml'
  }
];

const getHtmlFileNode = (path: string) => {
  const html = fs.readFileSync(path).toString();
  const dom = new JSDOM(html);
  const fileNode = dom.window.document.querySelector('.highlight.tab-size');
  if (!fileNode) {
    throw new Error('File node not found');
  }
  return fileNode;
};

describe('replace dependencies', () => {
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
