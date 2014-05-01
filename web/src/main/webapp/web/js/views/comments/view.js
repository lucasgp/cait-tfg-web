define([
    'jquery',
    'underscore',
    'backbone',
    'date',
    'text!/web/templates/comments/view.html'
], function($, _, Backbone, DateUtils, template) {
    var CommentView = Backbone.View.extend({
        tagName: 'li',
        className: 'comment',
        initialize: function() {
        },
        render: function() {
            var params = this.model.toJSON();
            params['DateUtils'] = DateUtils;
            this.$el.append(_.template(template, params));
            return this;
        },
        close: function() {
            this.unbind();
            this.remove();
        }
    });

    return CommentView;
});
