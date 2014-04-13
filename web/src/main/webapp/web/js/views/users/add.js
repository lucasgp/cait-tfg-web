define([
    'jquery-ui',
    'underscore',
    'backbone',
    'form',
    'models/users',
    'text!/web/templates/users/add.html'
], function($, _, Backbone, Form, UserModel, template) {
    var AddUserView = Backbone.View.extend({
        tagName: 'div',
        className: 'add-user',
        competitions: null,
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
                error: function() {
                    alert("Error saving user");
                }
            });
        }
    });
    return AddUserView;
});

