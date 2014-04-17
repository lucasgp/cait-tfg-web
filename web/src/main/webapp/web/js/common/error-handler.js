define([
    'noty'
], function(Channel) {
    var ErrorHandler = {
        onModelFetchError: function(model, response, options) {
            noty({
                layout: 'top',
                type: 'error',
                text: 'Error ' + response.status,
                dismissQueue: true,
                animation: {
                    open: {height: 'toggle'},
                    close: {height: 'toggle'},
                    easing: 'swing',
                    speed: 500
                },
                timeout: 0
            });
        },
        onDefaultRoute: function() {
            noty({
                layout: 'top',
                type: 'warning',
                text: "The page you requested doesn't exist",
                dismissQueue: true,
                animation: {
                    open: {height: 'toggle'},
                    close: {height: 'toggle'},
                    easing: 'swing',
                    speed: 500
                },
                timeout: 0
            });
        }
    };
    return ErrorHandler;
});