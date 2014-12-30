'use strict';

var _find              = require('lodash.find'),
    selectorCollection = require('./selectorCollection');

module.exports = function(rule, index) {
    var foundSelector = null;

    if (rule.type !== 'rule') {
        return;
    }

    // hopefully ES6 Array.prototype.find will be native in a near future :)
    foundSelector = _find(selectorCollection, function (selector) {
        return (selector.prefix.test(rule.selector));
    });

    return (foundSelector && foundSelector.handler.call(rule, this.childs, index));
};
