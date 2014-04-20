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
            if (!this.model) {
                this.model = new UserModel();
            }
            this.model.on('invalid', ErrorHandler.onModelValidationError);
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
                error: ErrorHandler.onModelFetchError
            });
        }
    });
    return AddUserView;
});

