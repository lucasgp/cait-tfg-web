define([
    'jquery',
    'underscore',
    'backbone',
    'date',
    'notif-handler',
    'models/users',
    'text!/web/templates/comments/view.html'
], function($, _, Backbone, DateUtils, NotificationHandler, UserModel, template) {
    var CommentView = Backbone.View.extend({
        tagName: 'li',
        className: 'comment',
        initialize: function() {
        },
        events: {
            'click .delete': 'removeComment'
        },
        render: function() {
            var params = this.model.toJSON();
            params['DateUtils'] = DateUtils;
            var userModel = new UserModel({id: this.model.get('userId')});
            var that = this;
            userModel.fetch({
                success: function() {
                    params['user'] = userModel;
                    that.$el.html(_.template(template, params));
                },
                error: NotificationHandler.onServerError
            });
            return this;
        },
        removeComment: function() {
            this.model.destroy({
                wait: true,
                success: NotificationHandler.onModelDeleteSuccess,
                error: NotificationHandler.onServerError
            });
        },
        close: function() {
            this.unbind();
            this.remove();
        }
    });

    return CommentView;
});
