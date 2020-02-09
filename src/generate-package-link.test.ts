import { generatePackageLink } from './generate-package-link';
import { PackageManager } from './types';

describe('generatePackageLink', () => {
  it('should generate NPM link', () => {
    const link = generatePackageLink(PackageManager.Npm, 'lodash');
    expect(link).toBe('https://www.npmjs.com/package/lodash');
  });

  it('should ignore reserved keywords in package.json', () => {
    const link = generatePackageLink(PackageManager.Npm, 'dependencies');
    expect(link).toBeFalsy();
  });

  it('should generate composer link', () => {
    const link = generatePackageLink(PackageManager.Composer, 'doctrine/doctrine-bundle');
    expect(link).toBe('https://packagist.org/packages/doctrine/doctrine-bundle');
  });

  it('should ignore PHP extensions and PHP version in composer file', () => {
    const link = generatePackageLink(PackageManager.Composer, 'ext-json');
    expect(link).toBeFalsy();

    const phpLink = generatePackageLink(PackageManager.Composer, 'php');
    expect(phpLink).toBeFalsy();
  });

  it('should generate Gopkg links', () => {
    const link = generatePackageLink(PackageManager.Gopkg, 'github.com/prometheus/client_golang');
    expect(link).toBe('https://github.com/prometheus/client_golang');
  });

  it('should generate rubygems link', () => {
    const link = generatePackageLink(PackageManager.RubyGems, 'rubysl');
    expect(link).toBe('https://rubygems.org/gems/rubysl');
  });

  it('should generate python link', () => {
    const link = generatePackageLink(PackageManager.Pip, 'pytest');
    expect(link).toBe('https://pypi.python.org/pypi/pytest');
  });
});
