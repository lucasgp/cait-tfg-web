// Require.js configuration.
require.config({
    paths: {
        'jquery': 'libs/jquery/jquery',
        'jqueryui': 'libs/jquery-ui/jquery-ui.custom',
        'noty': 'libs/noty/jquery.noty.packaged',
        'underscore': 'libs/underscore/underscore',
        'backbone': 'libs/backbone/backbone',
        'leaflet': 'libs/leaflet/leaflet',
        'i18n': 'libs/i18next/i18next.amd.withJQuery',
        'geo': 'libs/geo-position/geoPosition',
        'sockjs': 'libs/sockjs/sockjs',
        'stomp': 'libs/stomp/stomp',
        'page': 'common/page',
        'view-holder': 'common/view-holder',
        'form': 'common/form',
        'events': 'common/events',
        'notif-handler': 'common/notif-handler',
        'date': 'common/date-utils',
        'loading': 'common/loading',
        'geo-tracking': 'common/geo-tracking',
        'tracking-data': 'common/tracking-data'
    },
    shim: {
        'jqueryui': {
            exports: 'jQuery',
            deps: ['jquery']
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
        'notif-handler': {
            exports: 'NotificationHandler',
            deps: ['noty']
        },
        'geo': {
            exports: 'geoPosition'
        },
        'sockjs': {
            exports: 'SockJS'
        },
        'stomp': {
            exports: 'Stomp'
        }
    }
});
require([
    'backbone',
    'i18n',
    'router'
], function(Backbone, i18n, Router) {
    i18n.init({
        lng: navigator.language || navigator.userLanguage,
        resGetPath: 'js/i18n/__ns__.__lng__.json',
        fallbackLng: 'en'
    }, function() {
        document.title = $.t("app.title");
        $("#header-title").i18n();
        $("#footer-content").i18n();
        var router = new Router();
        Backbone.history.start();
    });
});
