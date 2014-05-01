define([
    'jquery',
    'underscore',
    'backbone',
    'page',
    'notif-handler',
    'models/competitions'
], function($, _, Backbone, Page, NotificationHandler, CompetitionModel) {

    var CompetitionCollection = Backbone.Collection.extend({
        model: CompetitionModel,
        url: '/resources/competitions',
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
                error: NotificationHandler.onServerError
            });
        }
    });
    return CompetitionCollection;
}
);
