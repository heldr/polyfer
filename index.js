'use strict';
var postcss = require('postcss'),
    parser  = require('./lib/parser');

module.exports = function (str) {
    return postcss(function(root) {
        root.eachRule(parser);
    }).process(str).css;
};
