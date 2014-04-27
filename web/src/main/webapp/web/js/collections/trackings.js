define([
    'jquery',
    'underscore',
    'backbone',
    'page',
    'error-handler',
    'models/trackings'
], function($, _, Backbone, Page, ErrorHandler, TrackingModel) {

    var TrackingCollection = Backbone.Collection.extend({
        model: TrackingModel,
        url: '/resources/trackings',
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
    return TrackingCollection;
}
);
