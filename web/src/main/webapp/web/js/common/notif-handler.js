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
        onGeolocationNotSupported: function() {
            NotificationHandler.notify('warning', "Geolocation not supported");
        },
        confirmAction: function(callbackOk, context) {
            NotificationHandler.notify('warning', 'Are you sure you want to continue?', 0, [
                {addClass: 'btn btn-primary', text: 'Ok', onClick: function($noty) {
                        $noty.close();
                        callbackOk.call(context);
                    }
                },
                {addClass: 'btn btn-danger', text: 'Cancel', onClick: function($noty) {
                        $noty.close();
                        NotificationHandler.notify('error', 'Action cancelled');
                    }
                }
            ]);
        },
        notify: function(type, text, timeout, buttons) {
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
                timeout: timeout || 10000,
                buttons: buttons
            });
        }
    };
    return NotificationHandler;
});