import { findPackageManager } from './find-package-manager';
import { PackageManager } from './types';

describe('findPackageManager', () => {
  it('should ignore non-package file', () => {
    const packageManager = findPackageManager(
      'https://github.com/kubk/github-package-links/blob/master/README.md'
    );
    expect(packageManager).toBeFalsy();
  });

  it('should detect gems.rb', () => {
    const packageManager = findPackageManager(
      'https://github.com/easysoftware/ryspec/blob/master/gems.rb'
    );
    expect(packageManager).toBe(PackageManager.RubyGems);
  });

  it('should detect gemfile', () => {
    const packageManager = findPackageManager(
      'https://github.com/sinatra/sinatra/blob/master/Gemfile'
    );
    expect(packageManager).toBe(PackageManager.RubyGems);
  });

  it('should detect composer.json', () => {
    const composer = findPackageManager(
      'https://github.com/kubk/labelbot/blob/master/composer.json'
    );
    expect(composer).toBe(PackageManager.Composer);
  });

  it('should detect python dependency files', () => {
    const pip = findPackageManager('https://github.com/ranger/ranger/blob/master/requirements.txt');
    expect(pip).toBe(PackageManager.Pip);

    const pipDev = findPackageManager(
      'https://github.com/ranger/ranger/blob/master/requirements.dev.txt'
    );
    expect(pipDev).toBe(PackageManager.Pip);

    const pipTest = findPackageManager(
      'https://github.com/ranger/ranger/blob/master/requirements.test.txt'
    );
    expect(pipTest).toBe(PackageManager.Pip);
  });

  it('should detect NPM files', () => {
    const packageManager = findPackageManager(
      'https://github.com/kubk/wave-algo/blob/master/package.json'
    );
    expect(packageManager).toBe(PackageManager.Npm);
  });

  it('should detect Gopkg files', () => {
    const packageManager = findPackageManager(
      'https://github.com/census-instrumentation/opencensus-go/blob/master/Gopkg.toml'
    );
    expect(packageManager).toBe(PackageManager.Gopkg);
  });
});
