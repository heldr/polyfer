'use strict';

var helper = require('./helper');

module.exports = [
    {
        prefix: /::(content)/,
        handler: function () {
            if (helper.hasNextSelectorPolyfill.apply(this, arguments)) {
                return;
            }

            this.selector = [
                'polyfill-next-selector { content: \'',
                helper.removePseudoSelector.call(this, ':content'),
                '\'; } ',
                this.selector
            ].join('');
        }
    },
    {
        prefix: /^:(scoped)/,
        handler: function () {
            this.prepend({ prop: 'content', value: ['\'', helper.removePseudoSelector.call(this, 'scoped'), '\''].join('') });

            this.selector = 'polyfill-rule';
        }
    },
    {
        prefix: /^:(unscoped)/,
        handler: function () {
            this.prepend({ prop: 'content', value: ['\'', helper.removePseudoSelector.call(this, 'unscoped'), '\''].join('') });

            this.selector = 'polyfill-unscoped-rule';
        }
    },
    {
        prefix: /:(deep)/,
        handler: function () {
            this.selector = this.selector.replace(/:(deep)/, '/deep/');
        }
    }
];
