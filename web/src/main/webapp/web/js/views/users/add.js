define([
    'jquery-ui',
    'underscore',
    'backbone',
    'models/users',
    'text!/web/templates/users/add.html'
], function($, _, Backbone, UserModel, template) {
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
            var inputRegExp = /user-(\w+)/;
            var value = {};
            this.$(':input').each(function() {
                var matches = inputRegExp.exec(this.id);
                if (matches && matches.length > 0)
                    value[matches[matches.length - 1]] = this.value;
            });
            var userModel = new UserModel();
            userModel.on('invalid', function(model, error) {
                alert(error);
            });
            userModel.save(value, {
                wait: true,
                error: function() {
                    alert("Error saving user");
                }
            });
        }
    });
    return AddUserView;
});

