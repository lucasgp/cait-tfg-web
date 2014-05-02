define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'notif-handler',
    'form',
    'views/comments/view',
    'text!/web/templates/comments/list.html'
], function($, _, Backbone, ViewHolder, NotificationHandler, Form, CommentView, listTemplate) {
    var CommentsListView = Backbone.View.extend({
        events: {
            'click #submit-comment': 'addComment'
        },
        initialize: function(options) {
            this.viewHolder = new ViewHolder();
            this.listenTo(this.collection, 'add remove', this.render);
        },
        render: function() {
            this.viewHolder.closeAll();
            this.$el.html(_.template(listTemplate, {comments: this.collection}));
            this.collection.forEach(this.renderCommentView, this);
            return this;
        },
        renderCommentView: function(model, index, list) {
            model.set({'competitionId': this.collection.competitionId});
            var view = new CommentView({model: model});
            this.viewHolder.register('commentView' + index, view);
            this.$("#comments-list").append(view.render().el);

        },
        addComment: function(event) {
            var values = Form.toObject(this, 'comment-');
            values['competitionId'] = this.collection.competitionId;
            this.collection.create(values, {
                wait: true,
                success: NotificationHandler.onModelSaveSuccess,
                error: NotificationHandler.onServerError
            });
        },
        close: function() {
            this.viewHolder.closeAll();
            this.unbind();
            this.remove();
        }
    });
    return CommentsListView;
});

