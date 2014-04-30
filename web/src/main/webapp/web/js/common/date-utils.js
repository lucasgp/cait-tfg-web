define([
    'jquery',
    'i18n'
], function($, i18n) {

    var DateUtils = {
        getTomorrow: function() {
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        },
        getFormat: function() {
            var language = $.i18n.options.lng.split('-')[0];
            return $.t('i18n.' + language + '.dateformat')
        }
    };
    return DateUtils;
}
);