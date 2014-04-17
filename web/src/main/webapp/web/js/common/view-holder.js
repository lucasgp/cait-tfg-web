define([
    'jquery',
    'underscore'
], function($, _) {

    var ViewHolder = function(parameters) {
        this.views = {};
    };
    ViewHolder.prototype = {
        register: function(name, view) {
            this.views[name] = view;
        },
        get: function(view) {
            var toReturn = view;
            if (typeof toReturn === 'string') {
                toReturn = this.views[view];
            }
            return toReturn;
        },
        close: function(view) {
            var toClose = this.get(view);
            if (toClose)
                toClose.close();
        },
        closeAll: function() {
            _.each(this.views, this.close, this);
        }
    };
    return ViewHolder;
});