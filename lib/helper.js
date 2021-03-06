'use strict';

module.exports = {
    removePseudoSelector: function(pseudo) {
        return this.selector.split(':' + pseudo).join('').trim().replace(/  +/g, ' ');
    },
    hasNextSelectorPolyfill: function(index) {
        var previousRule = this.root().nodes[index].prev() || false;

        return (previousRule && previousRule.selector === 'polyfill-next-selector');
    }
};
