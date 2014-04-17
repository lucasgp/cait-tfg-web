define([
    'backbone'
], function(Backbone) {

    var UserModel = Backbone.Model.extend({
        urlRoot: '/resources/users',
        initialize: function() {

        },
        defaults: {
            id: null,
            username: '',
            password: '',
            name: '',
            surname: '',
            email: '',
            phonePrefix: '',
            phoneNumber: ''
        },
        validate: function(attrs) {
            if (!attrs.username) {
                return 'Username is mandatory';
            }
            if (!attrs.password) {
                return 'Password is mandatory';
            }
            if (!attrs.name) {
                return 'Name is mandatory';
            }
            if (!attrs.email) {
                return 'Email is mandatory';
            }
        }
    });

    return UserModel;
}
);
