define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'form',
    'views/users/view',
    'text!/web/templates/users/list.html'
], function($, _, Backbone, ViewHolder, Form, UserView, listTemplate) {
    var UsersListView = Backbone.View.extend({
        initialize: function(options) {
            this.viewHolder = new ViewHolder();
            this.users = options.users;
            this.query = options.query;
        },
        events: {
            'click #submit-search': 'findUsers',
            'click #clear-search': 'clearQueryParams',
            'click #submit-prev': 'findPrevUsers',
            'click #submit-next': 'findNextUsers',
        },
        render: function() {
            this.viewHolder.closeAll();
            this.$el.html(_.template(listTemplate, {query: this.query, users: this.users}));
            this.users.each(this.createUserView, this);
            return this;
        },
        createUserView: function(user, index, list) {
            var view = new UserView({model: user});
            this.viewHolder.register('userView' + index, view);
            this.$("#users-list").append(view.render().el);
        },
        findPrevUsers: function() {
            if (this.query.page > 0) {
                this.query.page -= 1;
            }
            this.findUsers();
        },
        findNextUsers: function() {
            this.query.page += 1;
            this.findUsers();
        },
        findUsers: function() {
            var values = Form.toObject(this, 'user-search-');
            _.each(values, function(value, key) {
                if (value) {
                    this.query.params[key] = value;
                }
            }, this);
            this.users.findByQuery(this.query);
        },
        clearQueryParams: function() {
            this.query.params = {};
            this.render();
        },
        close: function() {
            this.viewHolder.closeAll();
            this.unbind();
            this.remove();
        }
    });
    return UsersListView;
});

