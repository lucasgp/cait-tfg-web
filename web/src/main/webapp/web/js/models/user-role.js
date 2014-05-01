define([
    'backbone',
    'notif-handler'
], function(Backbone, NotificationHandler) {

    var UserRoleModel = Backbone.Model.extend({
        urlRoot: '/resources/user_roles',
        initialize: function(options) {
        },
        defaults: {
            id: null,
            userId: null,
            roleTypesId: [],
            version: null
        },
        getByUserId: function(userId) {

            this.fetch({
                url: this.urlRoot.concat("?userId=").concat(userId),
                error: NotificationHandler.onServerError
            });
        }
    });

    return UserRoleModel;
});
