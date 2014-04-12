// Require.js configuration.
require.config({
    paths: {
        'jquery': 'libs/jquery/jquery',
        'jquery-ui': 'libs/jquery/jquery-ui',
        'underscore': 'libs/underscore/underscore',
        'backbone': 'libs/backbone/backbone',
        'page': 'common/page'
    },
    shim: {
        'jquery-ui': {
            exports: '$',
            deps: ['jquery']
        },
        underscore: {
            exports: '_',
            init: function() {
                this._.extend(this._.templateSettings, {
                    // Underscore configuration: change to a JSP friendly sintax.
                    interpolate: /\{\{(.+?)\}\}/gim,
                    evaluate: /\{\{(.+?)\}\}/gim,
                    escape: /\{\{\-(.+?)\}\}/gim
                });
                return this._;
            }
        },
        backbone: {
            exports: 'Backbone',
            deps: ['jquery', 'underscore']
        }
    }
});

require([
    'router'
], function(Router) {
    new Router();
    Backbone.history.start();
});
