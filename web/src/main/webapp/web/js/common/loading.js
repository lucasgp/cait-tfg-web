define([
    'jquery'
], function($) {

    $(document).ajaxStart(function() {
        $("#overlay").css("display", "block");
        $("#facebookG").css("display", "block");
    });
    $(document).ajaxComplete(function() {
        $("#facebookG").css("display", "none");
        $("#overlay").css("display", "none");
    });
}
);