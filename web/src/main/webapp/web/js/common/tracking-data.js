define([
    'jquery',
    'underscore',
    'leaflet'
], function($, _, L) {

    var TrackingData = function(parameters) {
        this.initTime = null;
        this.totalDistance = 0;
        this.geoJSON = {"type": "FeatureCollection",
            "features": []
        };
        if (parameters) {
            this.trackingId = parameters.trackingId || null;
            this.color = parameters.color || null;
        }
    };
    TrackingData.prototype = {
        processFeature: function(feature, index) {
            if (index === 0) {
                this.initTime = feature.properties.timestamp;
            } else {
                var prevFeature = this.geoJSON.features[index - 1];
                var distance = L.latLng(prevFeature.geometry.coordinates[1], prevFeature.geometry.coordinates[0]).distanceTo(L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]));
                this.totalDistance += distance;
                feature.properties.avgSpeed = (this.totalDistance / 1000) / ((feature.properties.timestamp - this.initTime) / (1000 * 60 * 60));
            }
            feature.properties.distance = this.totalDistance;
            feature.properties.color = this.color || null;
        },
        addGeoJSON: function(geoJSON) {
            if (geoJSON) {
                this.geoJSON = geoJSON;
                _.each(this.geoJSON.features, function(feature, index, features) {
                    this.processFeature(feature, index);
                }, this);
            }
        },
        addFeature: function(feature) {
            this.geoJSON.features.push(feature);
            this.processFeature(feature, this.geoJSON.features.length - 1);
        }
    };
    return TrackingData;
});