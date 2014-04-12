define([
    'page',
    'models/competitions'
], function(Page, CompetitionModel) {

    var CompetitionCollection = Backbone.Collection.extend({
        model: CompetitionModel,
        url: '/resources/competitions',
        parse: function(data) {
            return Page.parse(data);
        },
        findMostRecent: function(query) {

            this.fetch({
                url: this.url.concat("/").concat(query.page)
                        .concat("/").concat(query.size)
                        .concat("/").concat(query.sortProperty)
                        .concat("/").concat(query.sortOrder)
            });
        }
    });
    return CompetitionCollection;
}
);
