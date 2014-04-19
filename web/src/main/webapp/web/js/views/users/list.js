define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'views/users/view',
    'text!/web/templates/users/list.html',
    'text!/web/templates/empty.html'
], function($, _, Backbone, ViewHolder, UserView, listTemplate, emptyTemplate) {
    var UsersListView = Backbone.View.extend({
        tagName: 'ul',
        id: 'users-list',
        initialize: function(options) {
            this.viewHolder = new ViewHolder();
            this.users = options.users;
        },
        render: function() {
            if (this.users && this.users.length > 0) {
                this.$el.append(_.template(listTemplate, {}));
                this.users.each(this.createUserView, this);
            } else {
                this.$el.append(_.template(emptyTemplate, {}));
            }
            return this;
        },
        createUserView: function(user, index, list) {
            var view = new UserView({model: user});
            this.viewHolder.register('userView' + index, view);
            this.$el.append(view.render().el);
        },
        close: function() {
            this.viewHolder.closeAll();
            this.unbind();
            this.remove();
        }
    });
    return UsersListView;
});

