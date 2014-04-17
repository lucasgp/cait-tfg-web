// Require.js configuration.
require.config({
    paths: {
        'jquery': 'libs/jquery/jquery',
        'jqueryui/core': 'libs/jquery-ui/jquery.ui.core',
        'jqueryui/effect': 'libs/jquery-ui/jquery.ui.effect',
        'jqueryui/datepicker': 'libs/jquery-ui/jquery.ui.datepicker',
        'noty': 'libs/noty/jquery.noty.packaged',
        'underscore': 'libs/underscore/underscore',
        'backbone': 'libs/backbone/backbone',
        'leaflet': 'libs/leaflet/leaflet-src',
        'page': 'common/page',
        'view-holder': 'common/view-holder',
        'form': 'common/form',
        'events': 'common/events',
        'error-handler': 'common/error-handler'
    },
    shim: {
        'jqueryui/core': {
            exports: 'jQuery',
            deps: ['jquery']
        },
        'jqueryui/effect': {
            exports: 'jQuery',
            deps: ['jquery', 'libs/jquery-ui/jquery.ui.core']
        },
        'jqueryui/datepicker': {
            exports: 'jQuery',
            deps: ['jquery', 'libs/jquery-ui/jquery.ui.core', 'libs/jquery-ui/jquery.ui.effect']
        },
        'noty': {
            exports: 'noty',
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
        },
        leaflet: {
            exports: 'L'
        },
        'error-handler': {
            exports: 'ErrorHandler',
            deps: ['noty']
        }
    }
});
require([
    'router',
], function(Router, Channel) {
    var router = new Router();
    Backbone.history.start();
});
