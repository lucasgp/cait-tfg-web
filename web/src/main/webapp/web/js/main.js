// Require.js configuration.
require.config({
    paths: {
        'jquery': 'libs/jquery/jquery',
        'jquery-ui': 'libs/jquery/jquery-ui',
        'underscore': 'libs/underscore/underscore',
        'backbone': 'libs/backbone/backbone',
        'page': 'common/page',
        'view-holder': 'common/view-holder',
        'form': 'common/form',
        'events': 'common/events'
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
    'router',
    'events'
], function(Router, Channel) {
    var router = new Router();
    Backbone.history.start();
    Channel.on("competition:added", function() {
        router.navigate("competitions", {trigger: true});
    });
});
