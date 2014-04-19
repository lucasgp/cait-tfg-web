// Require.js configuration.
require.config({
    paths: {
        'jquery': 'libs/jquery/jquery',
        'jqueryui/core': 'libs/jquery-ui/jquery.ui.core',
        'jqueryui/widget': 'libs/jquery-ui/jquery.ui.widget',
        'jqueryui/position': 'libs/jquery-ui/jquery.ui.position',
        'jqueryui/button': 'libs/jquery-ui/jquery.ui.button',
        'jqueryui/effect': 'libs/jquery-ui/jquery.ui.effect',
        'jqueryui/datepicker': 'libs/jquery-ui/jquery.ui.datepicker',
        'jqueryui/dialog': 'libs/jquery-ui/jquery.ui.dialog',
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
        'jqueryui/widget': {
            exports: 'jQuery',
            deps: ['jquery']
        },
        'jqueryui/position': {
            exports: 'jQuery',
            deps: ['jquery']
        },
        'jqueryui/effect': {
            exports: 'jQuery',
            deps: ['jquery', 'jqueryui/core']
        },
        'jqueryui/datepicker': {
            exports: 'jQuery',
            deps: ['jquery', 'jqueryui/core', 'jqueryui/effect']
        },
        'jqueryui/button': {
            exports: 'jQuery',
            deps: ['jquery', 'jqueryui/core', 'jqueryui/widget']
        },
        'jqueryui/dialog': {
            exports: 'jQuery',
            deps: ['jquery', 'jqueryui/core', 'jqueryui/effect', 'jqueryui/position', 'jqueryui/button', 'jqueryui/widget']
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
                    interpolate: /\{\{=(.+?)\}\}/gim,
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
