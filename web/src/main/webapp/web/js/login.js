// Require.js configuration.
require.config({
    paths: {
        'jquery': 'libs/jquery/jquery',
        'i18n': 'libs/i18next/i18next.amd.withJQuery'
    }
});

require([
    'jquery',
    'i18n'
], function($, i18n) {
    i18n.init({
        lng: navigator.language || navigator.userLanguage,
        resGetPath: 'js/i18n/__ns__.__lng__.json',
        fallbackLng: 'en'
    }, function() {
        document.title = $.t("app.title") + ' - ' + $.t("login.title");
        $("#login-error").i18n();
        $("#login-logout").i18n();
        $("#username-label").i18n();
        $("#password-label").i18n();
        $("#submit-button").i18n();
        $("#goto-main").i18n();
    });
});
