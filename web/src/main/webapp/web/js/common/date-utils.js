define([
], function() {

    var DateUtils = {
        getTomorrow: function() {
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        }
    };
    return DateUtils;
}
);