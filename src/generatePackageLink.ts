import { PackageManager } from './PackageManager';

export const generatePackageLink = (
  packageManager: PackageManager,
  packageName: string
): string | null => {
  switch (packageManager) {
    case 'npm':
      return packageName === 'devDependencies'
        ? null
        : 'https://www.npmjs.com/package/' + packageName;

    case 'composer':
      // Exclude PHP extensions such as 'ext-json'
      return packageName.includes('/')
        ? 'https://packagist.org/packages/' + packageName
        : null;

    case 'rubyGems':
      return packageName.length > 0
        ? 'https://rubygems.org/gems/' + packageName
        : null;

    case 'pip':
      if (packageName.length < 1 || packageName.startsWith('git+')) {
        return null;
      }
      const shortPackageNames = packageName.match(/^\w+/);
      if (!shortPackageNames) {
        return null;
      }
      return 'https://pypi.python.org/pypi/' + shortPackageNames[0];
  }
};
