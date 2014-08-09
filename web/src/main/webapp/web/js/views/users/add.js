define([
    'jquery',
    'underscore',
    'backbone',
    'form',
    'events',
    'notif-handler',
    'models/users',
    'text!/web/templates/users/add.html'
], function($, _, Backbone, Form, Channel, NotificationHandler, UserModel, template) {
    var AddUserView = Backbone.View.extend({
        tagName: 'div',
        className: 'add-user',
        initialize: function(options) {
            if (!this.model) {
                this.model = new UserModel();
            }
            this.model.on('invalid', NotificationHandler.onModelValidationError);
            return this;
        },
        events: {
            'click #submit-user': 'create'
        },
        render: function() {
            this.$el.append(_.template(template, {}));
            return this;
        },
        create: function(event) {
            var values = Form.toObject(this, 'user-');
            ;
            this.model.save(values, {
                wait: true,
                success: function() {
                    Channel.trigger("user:created");
                },
                error: NotificationHandler.onServerError
            });
        },
        close: function() {
            this.unbind();
            this.remove();
        }
    });
    return AddUserView;
});

