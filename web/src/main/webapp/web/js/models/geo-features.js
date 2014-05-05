define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

    var GeoFeatureModel = Backbone.Model.extend({
        dontSync: ['trackingId'],
        urlRoot: function() {
            return '/resources/trackings/' + this.get('trackingId') + '/features';
        },
        toJSON: function(options) {
            return _.omit(this.attributes, this.dontSync);
        }
    });

    return GeoFeatureModel;
}
);
