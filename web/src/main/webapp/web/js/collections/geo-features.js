define([
    'jquery',
    'underscore',
    'backbone',
    'models/geo-features'
], function($, _, Backbone, GeoFeatureModel) {

    var GeoFeatureCollection = Backbone.Collection.extend({
        model: GeoFeatureModel,
        initialize: function(models, options) {
            this.trackingId = options.trackingId;
        },
        url: function() {
            return '/resources/trackings/' + this.trackingId + '/features';
        }
    });
    return GeoFeatureCollection;
}
);
