define([
    'jquery',
    'underscore',
    'backbone',
    'text!/web/templates/users/view.html'
], function($, _, Backbone, template) {
    var UserView = Backbone.View.extend({
        tagName: 'li',
        className: 'user',
        initialize: function() {
        },
        render: function() {
            this.$el.append(_.template(template, this.model.toJSON()));
            return this;
        },
        close: function() {
            this.unbind();
            this.remove();
        }
    });

    return UserView;
});
