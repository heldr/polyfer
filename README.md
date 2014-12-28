#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> Post-processor for [Polymer CSS polyfills][polyfills-doc]


## Install

```sh
$ npm install --save polyfer
```


## Usage

```js
var polyfer = require('polyfer');

polyfer('::content p'); // => polyfill-next-selector {...} ::content p
polyfer('x-element ::content p'); // => polyfill-next-selector {...} x-element ::content
polyfer('::scoped x-element p'); // => polyfill-rule {...}
polyfer('::unscoped x-element p'); // => polyfill-unscoped-rule {...}
```

```sh
$ npm install --global polyfer
$ polyfer input.css
$ polyfer input.css > output.css
$ polyfer --help
```


## License

MIT © [Helder Santana](http://git.io/heldr)


[npm-url]: https://npmjs.org/package/polyfer
[npm-image]: https://badge.fury.io/js/polyfer.svg
[travis-url]: https://travis-ci.org/heldr/polyfer
[travis-image]: https://travis-ci.org/heldr/polyfer.svg?branch=master
[daviddm-url]: https://david-dm.org/heldr/polyfer.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/heldr/polyfer
[polyfills-doc]: https://www.polymer-project.org/docs/polymer/styling.html#directives
