define([
    'noty'
], function(noty) {
    var NotificationHandler = {
        onModelSaveSuccess: function(model, response, options) {

            var message = '(';
            _.each(model.changed, function(element, index, list) {
                if ('version' !== index) {
                    message += index + ": " + element;
                    if (index < list.length - 1) {
                        message += ', ';
                    }
                }
            });
            message += ')';

            NotificationHandler.notify('success', 'Entity updated successfully ' + message);
        },
        onModelDeleteSuccess: function(model, response, options) {
            NotificationHandler.notify('success', 'Entity deleted successfully');
        },
        onModelValidationError: function(model, error) {
            NotificationHandler.notify('warning', error);
        },
        onServerError: function(entity, response, options) {
            NotificationHandler.notify('error', 'Error ' + response.status);
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
                timeout: 10000
            });
        }
    };
    return NotificationHandler;
});