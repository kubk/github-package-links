# github-package-links [![Build Status](https://travis-ci.org/kubk/github-package-links.svg?branch=master)](https://travis-ci.org/kubk/github-package-links)

Userscript generates links for packages in dependency files like package.json, composer.json, Gemfile on GitHub.
Supported files:
- `package.json` / `bower.json` (JavaScript)
- `composer.json` (PHP)
- `Gemfile` / `gems.rb` (Ruby)
- `requirements.txt` (Python)

### Try without installation
1. Open [package.json](./package.json)
2. Paste [./dist/bundle.js](https://raw.githubusercontent.com/kubk/github-package-links/master/dist/bundle.js) into browser console

### Installation
1. Install [GreaseMonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) for Firefox or [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) for Google Chrome
2. (TODO) Use `yarn build-userscript` to manually build the userscript.

### Tests
Run `yarn test`
