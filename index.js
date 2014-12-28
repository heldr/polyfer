'use strict';
var postcss = require('postcss');

function removePseudoSelector(selector, pseudo) {
    return selector.split('::' + pseudo).join('').trim().replace(/  +/g, ' ');
}

function createNextSelectorPolyfill(selector) {
    return [
        'polyfill-next-selector { content: \'',
        removePseudoSelector(selector, 'content'),
        '\'; } ',
        selector
    ].join('');
}

module.exports = function (str) {
    return postcss(function(css) {
        css.eachRule(function(rule) {
            if (rule.selector.match(/::(content)/)) {
                return rule.selector = createNextSelectorPolyfill(rule.selector);
            }

            if (rule.selector.match(/^::(scoped)/)) {
                rule.prepend({ prop: 'content', value: ['\'', removePseudoSelector(rule.selector, 'scoped'), '\''].join('') });
                rule.selector = 'polyfill-rule';

                return;
            }

            if (rule.selector.match(/^::(unscoped)/)) {
                rule.prepend({ prop: 'content', value: ['\'', removePseudoSelector(rule.selector, 'unscoped'), '\''].join('') });
                rule.selector = 'polyfill-unscoped-rule';

                return;
            }
        });
    }).process(str).css;
};
