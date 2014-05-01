define([
    'noty'
], function(noty) {
    var NotificationHandler = {
        onModelSaveSuccess: function(model, response, options) {

            var message = '(';
            _.each(model.changed, function(element, index, list) {
                message += index + ": " + element;
                if (index < list.length - 1) {
                    message += ', ';
                }
            });
            message += ')';

            NotificationHandler.notify('success', 'Updated successfully. ' + message);
        },
        onModelFetchError: function(model, response, options) {
            NotificationHandler.notify('error', 'Error ' + response.status);
        },
        onModelValidationError: function(model, error) {
            NotificationHandler.notify('warning', error);
        },
        onDefaultRoute: function() {
            NotificationHandler.notify('warning', "The page you requested doesn't exist");
        },
        notify: function(type, text) {
            noty({
                layout: 'top',
                type: type,
                text: text,
                dismissQueue: true,
                animation: {
                    open: {height: 'toggle'},
                    close: {height: 'toggle'},
                    easing: 'swing',
                    speed: 500
                },
                timeout: 1000
            });
        }
    };
    return NotificationHandler;
});