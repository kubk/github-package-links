# github-package-links [![Build Status](https://travis-ci.org/kubk/github-package-links.svg?branch=master)](https://travis-ci.org/kubk/github-package-links)

A userscript that generates links for packages in dependency files like package.json, composer.json, Gemfile on GitHub.
Supported files:
- `package.json` / `bower.json` (JavaScript)
- `composer.json` (PHP)
- `Gemfile` / `gems.rb` (Ruby)
- `requirements.txt` (Python)

### Installation
1. Install [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) for Google Chrome or [GreaseMonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) for Firefox
2. Build prod bundle: `yarn build-prod`
3. Use `cat userscript-header.txt dist/bundle.js > userscript.js` to build the userscript

### Browser support

### Tests
Run `yarn test`
