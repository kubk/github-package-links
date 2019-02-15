import { PackageManager } from './PackageManager';

export const findPackageManager = (pageUrl: string): PackageManager | null => {
  switch (true) {
    case pageUrl.endsWith('Gemfile') || pageUrl.endsWith('gems.rb'):
      return 'rubyGems';
    case pageUrl.endsWith('package.json') || pageUrl.endsWith('bower.json'):
      return 'npm';
    // Match requirements.dev.txt, requirements.test.txt
    case /requirements.*txt$/.test(pageUrl):
      return 'pip';
    case pageUrl.endsWith('composer.json'):
      return 'composer';
    default:
      return null;
  }
};
