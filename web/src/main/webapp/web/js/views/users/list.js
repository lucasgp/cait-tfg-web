define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'views/users/view',
    'text!/web/templates/users/list.html'
], function($, _, Backbone, ViewHolder, UserView, listTemplate) {
    var UsersListView = Backbone.View.extend({
        initialize: function(options) {
            this.viewHolder = new ViewHolder();
            this.users = options.users;
        },
        render: function() {
            this.$el.append(_.template(listTemplate, {users: this.users}));
            this.users.each(this.createUserView, this);
            return this;
        },
        createUserView: function(user, index, list) {
            var view = new UserView({model: user});
            this.viewHolder.register('userView' + index, view);
            this.$("#users-list").append(view.render().el);
        },
        close: function() {
            this.viewHolder.closeAll();
            this.unbind();
            this.remove();
        }
    });
    return UsersListView;
});

