define([
    'jquery',
    'underscore'
], function($, _) {

    var ViewHolder = function(parameters) {
        this.parent = parameters.parent;
        this.views = {};
    };
    ViewHolder.prototype = {
        register: function(name, view) {
            this.views[name] = view;
            this.render(view);
        },
        render: function(view) {
            this.parent.$el.append(view.render().el);
        },
        get: function(name) {
            return this.views[name];
        },
        show: function(view) {
            var toShow = view;
            if (typeof toShow === 'string') {
                toShow = this.get(view);
            }
            $(toShow.el).show();
        },
        hide: function(view) {
            $(view.el).hide();
        },
        hideAll: function() {
            _.each(this.views, this.hide);
        }
    };
    return ViewHolder;
});