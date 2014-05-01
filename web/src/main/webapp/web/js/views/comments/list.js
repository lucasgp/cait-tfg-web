define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'notif-handler',
    'form',
    'events',
    'models/comments',
    'models/users',
    'views/comments/view',
    'text!/web/templates/comments/list.html'
], function($, _, Backbone, ViewHolder, NotificationHandler, Form, Channel, CommentModel, UserModel, CommentView, listTemplate) {
    var CommentsListView = Backbone.View.extend({
        events: {
            'click #submit-comment': 'addComment'
        },
        initialize: function(options) {
            this.viewHolder = new ViewHolder();
            this.comments = options.comments;
            this.competitionId = options.competitionId;
        },
        render: function() {
            this.$el.append(_.template(listTemplate, {comments: this.comments}));
            _.each(_.sortBy(this.comments, 'commentDate', this), this.createCommentView, this);
            return this;
        },
        createCommentView: function(comment, index, list) {
            var commentModel = new CommentModel(comment);
            var userModel = new UserModel({id: comment.userId});
            var viewHolder = this.viewHolder;
            userModel.fetch({
                success: function() {
                    commentModel.set('user', userModel);
                    var view = new CommentView({model: commentModel});
                    viewHolder.register('commentView' + index, view);
                    $("#comments-list").append(view.render().el);
                },
                error: NotificationHandler.onModelFetchError
            });
        },
        addComment: function(event) {
            var values = Form.toObject(this, 'comment-');
            var comment = new CommentModel({competitionId: this.competitionId});
            var competitionId = this.competitionId;
            comment.on('invalid', function(model, error) {
                alert(error);
            });
            comment.save(values, {
                wait: true,
                success: function() {
                    Channel.trigger("comment:added", {competitionId: competitionId});
                },
                error: NotificationHandler.onModelFetchError
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

