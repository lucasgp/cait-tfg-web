define([
    'jquery',
    'underscore',
    'backbone',
    'models/role-types'
], function($, _, Backbone, RoleTypeModel) {

    var RoleTypeCollection = Backbone.Collection.extend({
        model: RoleTypeModel,
        url: '/resources/role_types'
    });
    return RoleTypeCollection;
}
);
