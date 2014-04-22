define([
    'page',
    'error-handler',
    'models/users'
], function(Page, ErrorHandler, UserModel) {

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
                        .concat("/").concat(query.sortOrder),
                error: ErrorHandler.onModelFetchError
            });
        }
    });
    return UsersCollection;
}
);
