# import-local-file

[![NPM version](https://img.shields.io/npm/v/import-local-file.svg?style=flat)](https://npmjs.com/package/import-local-file) [![NPM downloads](https://img.shields.io/npm/dm/import-local-file.svg?style=flat)](https://npmjs.com/package/import-local-file) [![CircleCI](https://circleci.com/gh/egoist/import-local-file/tree/master.svg?style=shield&circle-token=560404744e167900959a512d617a05ec5240616f)](https://circleci.com/gh/egoist/import-local-file/tree/master)  [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

> Let a globally installed package use a locally installed version of itself if available

Useful for CLI tools that want to defer to the user's locally installed version when available, but still work if it's not installed locally. For example, [Poi](http://github.com/egoist/poi) uses this method.


## Install

```
$ npm install --save import-local-file
```


## Usage

```js
const importLocalFile = require('import-local');

const localFile = importLocalFile(__filename)
if (localFile) {
	console.log('Using local version of this package');
	require(localFile);
} else {
	// Code for both global and local version here…
}
```


## License

MIT © [EGOIST](https://github.com/egoist) forked from [Sindre Sorhus](https://github.com/sindresorhus/import-local)
