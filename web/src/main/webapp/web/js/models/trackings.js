define([
    'backbone'
], function(Backbone) {

    var TrackingModel = Backbone.Model.extend({
        urlRoot: '/resources/trackings',
        initialize: function() {

        },
        defaults: {
            id: null,
            userId: null,
            version: null,
            geoJson: null
        }
    });

    return TrackingModel;
}
);
