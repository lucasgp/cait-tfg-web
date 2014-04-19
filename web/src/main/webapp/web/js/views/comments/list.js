define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'error-handler',
    'models/comments',
    'models/users',
    'views/comments/view',
    'text!/web/templates/comments/list.html'
], function($, _, Backbone, ViewHolder, ErrorHandler, CommentModel, UserModel, CommentView, listTemplate) {
    var CommentsListView = Backbone.View.extend({
        tagName: 'ul',
        id: 'comments-list',
        initialize: function(options) {
            this.viewHolder = new ViewHolder();
            this.comments = options.comments;
        },
        render: function() {
            if (this.comments && this.comments.length > 0) {
                this.$el.append(_.template(listTemplate, {}));
                _.each(_.sortBy(this.comments, 'commentDate', this), this.createCommentView, this);
            } else {
                this.$el.append("No comments in this competition yet! Do you have something to share?");
            }
            return this;
        },
        createCommentView: function(comment, index, list) {
            var commentModel = new CommentModel(comment);
            var userModel = new UserModel({id: comment.userId});
            var viewHolder = this.viewHolder;
            var $el = this.$el;
            userModel.fetch({
                success: function() {
                    commentModel.set('user', userModel);
                    var view = new CommentView({model: commentModel});
                    viewHolder.register('commentView' + index, view);
                    $el.append(view.render().el);
                },
                error: ErrorHandler.onModelFetchError
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

