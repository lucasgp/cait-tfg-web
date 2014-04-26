define([
    'jquery'
], function($) {

    $(document).ajaxStart(function() {
        $("#overlay").css("display", "block");
        $("#loading").css("display", "block");
    });
    $(document).ajaxComplete(function() {
        $("#loading").css("display", "none");
        $("#overlay").css("display", "none");
    });
}
);