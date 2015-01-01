# Polyfer [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image] [![Coverage Status][coveralls-image]][coveralls-url]

> Post-processor for [Polymer CSS polyfills][polyfills-doc]

## Install

```bash
$ npm install --save polyfer
```

In a case that you are a task manager lover, please try [gulp-polyfer][npm-gulp-url] or [grunt-polyfer][npm-grunt-url] and have fun :)

## Usage

### Module

```js
var polyfer = require('polyfer');

polyfer('::content p { color: blue; }');
// => polyfill-next-selector { content: 'p' } ::content p { color: blue; }

polyfer('x-element ::content p {...}');
// => polyfill-next-selector {...} x-element ::content

polyfer(':scoped x-element p { color: blue; }');
// => polyfill-rule { content: 'x-element p'; color: blue; }

polyfer(':unscoped x-element p');
// => polyfill-unscoped-rule {...}

// since some preprocessors do not support /deep/ selectors
polyfer('body :deep a { outline: 1; }');
// => body /deep/ a { outline: 1; }
```

See examples comparing [fixture.css(before)](test/fixture.css) with [expected.css(after)](test/expected.css).

### Client

```sh
$ npm install --global polyfer
$ polyfer input.css
$ polyfer input.css > output.css
$ polyfer --help
```

## Release notes

 * 0.1.0 - refactory, bug fixes and /deep/ selectors
 * 0.0.x - first releases

## Roadmap
* 0.2.0 - enable and disable specific polyfills processing

## Contribute

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [gulp](http://gulpjs.com/).

```shell
git clone https://github.com/heldr/polyfer.git
cd polyfer
npm install
grunt watch
```

## License

MIT © [Helder Santana](http://git.io/heldr)


[npm-url]: https://npmjs.org/package/polyfer
[npm-gulp-url]: https://npmjs.org/package/gulp-polyfer
[npm-grunt-url]: https://npmjs.org/package/grunt-polyfer
[npm-image]: https://img.shields.io/npm/v/polyfer.svg?style=flat
[travis-url]: https://travis-ci.org/heldr/polyfer
[travis-image]: https://travis-ci.org/heldr/polyfer.svg?branch=master
[daviddm-url]: https://david-dm.org/heldr/polyfer.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/heldr/polyfer
[polyfills-doc]: https://www.polymer-project.org/docs/polymer/styling.html#directives
[coveralls-url]: https://coveralls.io/r/heldr/polyfer
[coveralls-image]: https://img.shields.io/coveralls/heldr/polyfer/master.svg?style=flat
