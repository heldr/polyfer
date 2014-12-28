#!/usr/bin/env node
'use strict';
var meow    = require('meow');
var polyfer = require('./');
var fs      = require('fs');

var cli = meow({
  help: [
    'Usage',
    '  polyfer <input>',
    '',
    'Example',
    '  polyfer foobar.css',
    '  polyfer foobar.css > output.css'
  ].join('\n')
});

console.log(polyfer(fs.readFileSync(cli.input[0], 'utf-8')));
