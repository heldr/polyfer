/*global describe, it */
'use strict';
var assert   = require('assert');
var polyfer  = require('../');
var fs       = require('fs');
var path     = require('path');
var exec     = require('child_process').exec;
var expected = fs.readFileSync(path.join(__dirname, 'expected.css'), 'utf-8');

describe('polyfer node module', function () {
    describe('polyfill-next-selector', function() {
        it('should add rules for ::content pseudo-selectors at the begin', function () {
            var rule = '::content p > a { display: block; }';

            assert.deepEqual(polyfer(rule), 'polyfill-next-selector { content: \'p > a\'; } ' + rule);
        });

        it('should add rules for ::content pseudo-selectors at any position', function () {
            var rule = 'x-element ::content p > a { display: block; }';

            assert.deepEqual(polyfer(rule), 'polyfill-next-selector { content: \'x-element p > a\'; } ' + rule);
        });
    });

    describe('polyfill-rule', function() {
        it('should replace rules for ::scoped fake pseudo-selectors', function () {
            var rule = '::scoped x-element p > a { display: block; }';

            assert.deepEqual(polyfer(rule), 'polyfill-rule { content: \'x-element p > a\'; display: block; }');
        });

        it('should only consider selectors which starts with ::scoped', function () {
            var rule = 'x-element ::scoped p > a { display: block; }';

            assert.deepEqual(polyfer(rule), rule);
        });
    });

    describe('polyfill-unscoped-rule', function() {
        it('should replace rules for ::unscoped fake pseudo-selectors', function () {
            var rule = '::unscoped x-element p > a { display: block; }';

            assert.deepEqual(polyfer(rule), 'polyfill-unscoped-rule { content: \'x-element p > a\'; display: block; }');
        });

        it('should replace rules for ::unscoped fake pseudo-selectors', function () {
            var rule = 'x-element ::unscoped p > a { display: block; }';

            assert.deepEqual(polyfer(rule), rule);
        });
    });
});

describe('polyfer node client', function () {
    it('should process a css file', function (done) {
        exec(path.join(process.cwd(), 'cli.js ') + path.join(__dirname, 'fixture.css'), function (err, stdout) {
            assert.equal(err, null);
            assert.deepEqual(stdout, expected);
            done();
        });
    });
});
