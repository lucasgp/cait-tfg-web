define([
    'jquery',
    'underscore',
    'backbone',
    'text!/web/templates/comments/view.html'
], function($, _, Backbone, template) {
    var CommentView = Backbone.View.extend({
        tagName: 'li',
        className: 'comment',
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

    return CommentView;
});
