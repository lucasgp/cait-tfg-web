define([
    'jquery',
    'underscore',
    'backbone',
    'form',
    'events',
    'error-handler',
    'models/users',
    'text!/web/templates/users/add.html'
], function($, _, Backbone, Form, Channel, ErrorHandler, UserModel, template) {
    var AddUserView = Backbone.View.extend({
        tagName: 'div',
        className: 'add-user',
        initialize: function(options) {
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
            var userModel = new UserModel();
            userModel.on('invalid', function(model, error) {
                alert(error);
            });
            userModel.save(values, {
                wait: true,
                success: function() {
                    Channel.trigger("user:created");
                },
                error: ErrorHandler.onModelFetchError
            });
        }
    });
    return AddUserView;
});

