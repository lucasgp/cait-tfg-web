define([
    'jquery',
    'underscore',
    'backbone',
    'page',
    'error-handler',
    'models/users'
], function($, _, Backbone, Page, ErrorHandler, UserModel) {

    var UsersCollection = Backbone.Collection.extend({
        model: UserModel,
        url: '/resources/users',
        parse: function(data) {
            return Page.parse(data, this);
        },
        findByQuery: function(query) {

            this.fetch({
                url: this.url.concat("/").concat(query.page)
                        .concat("/").concat(query.size)
                        .concat("/").concat(query.sortProperty)
                        .concat("/").concat(query.sortOrder)
                        .concat("?").concat($.param(query.params ? query.params : [])),
                error: ErrorHandler.onModelFetchError
            });
        }
    });
    return UsersCollection;
}
);
