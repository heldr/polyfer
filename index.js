'use strict';
var postcss = require('postcss'),
    parser  = require('./lib/parser');

module.exports = function (str) {
    return postcss(function(root) {
        root.each(parser.bind(root));
    }).process(str).css;
};
