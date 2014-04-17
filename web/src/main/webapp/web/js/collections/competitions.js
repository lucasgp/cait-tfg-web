define([
    'page',
    'error-handler',
    'models/competitions'
], function(Page, ErrorHandler, CompetitionModel) {

    var CompetitionCollection = Backbone.Collection.extend({
        model: CompetitionModel,
        url: '/resources/competitions',
        parse: function(data) {
            return Page.parse(data);
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
    return CompetitionCollection;
}
);
