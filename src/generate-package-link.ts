import { PackageManager } from './types';

export const generatePackageLink = (
  packageManager: PackageManager,
  packageName: string
): string | null => {
  switch (packageManager) {
    case PackageManager.Npm:
      const reservedKeys = [
        'devDependencies',
        'dependencies',
        'peerDependencies',
        'optionalDependencies'
      ];
      if (reservedKeys.includes(packageName)) {
        return null;
      }
      return `https://www.npmjs.com/package/${packageName}`;

    case PackageManager.Composer:
      // Exclude PHP extensions such as 'ext-json'
      return packageName.includes('/') ? `https://packagist.org/packages/${packageName}` : null;

    case PackageManager.RubyGems:
      return packageName.length > 0 ? `https://rubygems.org/gems/${packageName}` : null;

    case PackageManager.Gopkg:
      return packageName.length > 0 ? `https://${packageName}` : null;

    case PackageManager.Pip:
      if (packageName.length < 1 || packageName.startsWith('git+')) {
        return null;
      }
      const shortPackageNames = packageName.match(/^\w+/);
      if (!shortPackageNames) {
        return null;
      }
      return `https://pypi.python.org/pypi/${shortPackageNames[0]}`;
  }
};
