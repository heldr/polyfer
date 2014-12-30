'use strict';

var helper  = require('./helper'),
    postcss = require('postcss');

module.exports = [
    {
        prefix: /::(content)/,
        handler: function () {
            var newRule = null,
                parent  = this.parent,
                index   = parent.index(this);

            if (helper.hasNextSelectorPolyfill.call(this, index)) {
                return;
            }

            newRule = postcss.rule({
                selector: 'polyfill-next-selector'
            });
            newRule.append({
                prop: 'content',
                value: '\'' + helper.removePseudoSelector.call(this, ':content') + '\''
            });
            parent.insertBefore(index, newRule);

            this.before = '\n';
        }
    },
    {
        prefix: /^:(scoped)/,
        handler: function () {
            this.prepend({
                prop: 'content',
                value: '\'' + helper.removePseudoSelector.call(this, 'scoped') + '\''
            });

            this.selector = 'polyfill-rule';
        }
    },
    {
        prefix: /^:(unscoped)/,
        handler: function () {
            this.prepend({
                prop: 'content',
                value: '\'' + helper.removePseudoSelector.call(this, 'unscoped') + '\''
            });

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
