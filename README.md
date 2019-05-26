# github-package-links [![Build Status](https://travis-ci.org/kubk/github-package-links.svg?branch=master)](https://travis-ci.org/kubk/github-package-links)  [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A userscript that generates links for packages in dependency files like package.json, composer.json, Gemfile on GitHub. Inspired by GitLab.

<img src="https://github.com/kubk/github-package-links/raw/master/dist/1s.png" width="380" height="304" hspace="30"> <img src="https://github.com/kubk/github-package-links/raw/master/dist/2s.png" width="380" height="304">

### Supported files
- `package.json` / `bower.json` (JavaScript)
- `composer.json` (PHP)
- `Gemfile` / `gems.rb` (Ruby)
- `requirements.txt` (Python)
- `Gopkg.toml` (Go)

### Requirements
- [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) for Google Chrome or [GreaseMonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) for Firefox

### Quick installation
- Click [here](https://github.com/kubk/github-package-links/raw/build/script.user.js)

### Manual installation
You can inspect code and build extension manually from source:
1. `npm run build:prod`
2. Generate userscript: `cat userscript-header.txt dist/bundle.js > script.user.js`

### Browser support
- Google Chrome 64+
- Firefox 60+

### Tests
Run `npm run test`
