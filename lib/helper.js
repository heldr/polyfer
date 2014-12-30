'use strict';

module.exports = {
    removePseudoSelector: function(pseudo) {
        return this.selector.split(':' + pseudo).join('').trim().replace(/  +/g, ' ');
    },
    hasNextSelectorPolyfill: function(childs, index) {
        var previousRule = childs[index - 1];

        return (previousRule && previousRule.selector === 'polyfill-next-selector');
    }
};
