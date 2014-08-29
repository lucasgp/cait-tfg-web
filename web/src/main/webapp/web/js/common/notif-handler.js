define([
    'jquery',
    'noty',
    'i18n'
], function($, noty, i18n) {
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

            NotificationHandler.notify('success', $.t('notification.ok'));
        },
        onModelDeleteSuccess: function(model, response, options) {
            NotificationHandler.notify('success', $.t('notification.ok'));
        },
        onModelValidationError: function(model, error) {
            NotificationHandler.notify('warning', error);
        },
        onServerError: function(entity, response, options) {
            NotificationHandler.notify('error', $.t('notification.ko'));
        },
        onDefaultRoute: function() {
            NotificationHandler.notify('warning', $.t('notification.wrongPage'));
        },
        onGeolocationNotSupported: function() {
            NotificationHandler.notify('warning', $.t('notification.geoNotSupported'));
        },
        confirmAction: function(callbackOk, context) {
            NotificationHandler.notify('warning', $.t('notification.confirm'), 0, [
                {addClass: 'btn btn-primary', text: $.t('form.ok'), onClick: function($noty) {
                        $noty.close();
                        callbackOk.call(context);
                    }
                },
                {addClass: 'btn btn-danger', text: $.t('form.cancel'), onClick: function($noty) {
                        $noty.close();
                        NotificationHandler.notify('warning', $.t('notification.cancel'));
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