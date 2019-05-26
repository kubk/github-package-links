import { PackageManager } from './package-manager';

export const findPackageManager = (pageUrl: string): PackageManager | null => {
  switch (true) {
    case pageUrl.endsWith('Gemfile') || pageUrl.endsWith('gems.rb'):
      return PackageManager.RubyGems;
    case pageUrl.endsWith('Gopkg.toml'):
      return PackageManager.Gopkg;
    case pageUrl.endsWith('package.json') || pageUrl.endsWith('bower.json'):
      return PackageManager.Npm;
    // Match requirements.dev.txt, requirements.test.txt
    case /requirements.*txt$/.test(pageUrl):
      return PackageManager.Pip;
    case pageUrl.endsWith('composer.json'):
      return PackageManager.Composer;
    default:
      return null;
  }
};
