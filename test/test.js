/*global describe, it, before, after */
'use strict';
var assert      = require('assert'),
    polyfer     = require('../'),
    fs          = require('fs'),
    path        = require('path'),
    exec        = require('child_process').exec,
    fixturePath = path.join(__dirname, 'fixture.css'),
    fixture     = null,
    expected    = null;

describe('polyfer', function () {
    before(function () {
        expected = fs.readFileSync(path.join(__dirname, 'expected.css'), 'utf-8');
        fixture  = fs.readFileSync(fixturePath, 'utf-8');
    });

    after(function () {
        expected = null;
        fixture = null;
    });

    describe('module', function () {
        describe('polyfill-next-selector', function() {
            it('should add rules for ::content pseudo-selectors at the begin', function () {
                var rule = '::content p > a { display: block; }';

                assert.deepEqual(polyfer(rule), 'polyfill-next-selector { content: \'p > a\' }\n' + rule);
            });

            it('should add rules for ::content pseudo-selectors, no matter the position', function () {
                var rule = 'x-element ::content p > a { display: block; }';

                assert.deepEqual(polyfer(rule), 'polyfill-next-selector { content: \'x-element p > a\' }\n' + rule);
            });

            it('should not consider applied polyfill-next-selector', function () {
                var rule = 'polyfill-next-selector { content: \'x-element p > a\'; }\nx-element ::content p > a { display: block; }';

                assert.deepEqual(polyfer(rule), rule);
            });
        });

        describe('polyfill-rule', function() {
            it('should replace rules for :scoped fake pseudo-selectors', function () {
                var rule = ':scoped x-element p > a { display: block; }';

                assert.deepEqual(polyfer(rule), 'polyfill-rule { content: \'x-element p > a\'; display: block; }');
            });

            it('should only consider selectors which starts with :scoped', function () {
                var rule = 'x-element :scoped p > a { display: block; }';

                assert.deepEqual(polyfer(rule), rule);
            });
        });

        describe('polyfill-unscoped-rule', function() {
            it('should replace rules for :unscoped fake selectors', function () {
                var rule = ':unscoped x-element p > a { display: block; }';

                assert.deepEqual(polyfer(rule), 'polyfill-unscoped-rule { content: \'x-element p > a\'; display: block; }');
            });

            it('should only consider selectors which starts with :unscoped', function () {
                var rule = 'x-element :unscoped p > a { display: block; }';

                assert.deepEqual(polyfer(rule), rule);
            });
        });

        describe('/deep/', function() {
            it('should replace :deep fake selectors with /deep/ (since some pre-processors does not support /deep/ expression)', function () {
                var rule = 'x-element :deep p > a { display: block; }';

                assert.deepEqual(polyfer(rule), 'x-element /deep/ p > a { display: block; }');
            });
        });

        describe('all cases', function () {
            it('should run all cases in a single string', function () {
                assert.strictEqual(polyfer(fixture).trim(), expected.trim());
            });
        });
    });

    describe('client', function () {
        it('should process a css file', function (done) {
            exec(path.join(process.cwd(), 'cli.js ') + fixturePath, function (err, stdout) {
                assert.equal(err, null);
                assert.deepEqual(stdout, expected);
                done();
            });
        });
    });
});
