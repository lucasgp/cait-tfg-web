define([
    'backbone'
], function(Backbone) {

    var RoleTypeModel = Backbone.Model.extend({
        urlRoot: '/resources/role_types',
        initialize: function() {

        },
        defaults: {
            id: null,
            name: null,
            description: null,
            version: null
        }
    });

    return RoleTypeModel;
}
);
