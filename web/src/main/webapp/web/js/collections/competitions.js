define([
    'jquery',
    'underscore',
    'backbone',
    'page',
    'error-handler',
    'models/competitions'
], function($, _, Backbone, Page, ErrorHandler, CompetitionModel) {

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
                        .concat("/").concat(query.sortOrder)
                        .concat("?").concat($.param(query.params ? query.params : [])),
                error: ErrorHandler.onModelFetchError
            });
        }
    });
    return CompetitionCollection;
}
);
