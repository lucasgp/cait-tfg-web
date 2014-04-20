define([
    'jqueryui',
    'underscore',
    'backbone',
    'events',
    'leaflet'
], function($, _, Backbone, Channel, L) {
    var MapView = Backbone.View.extend({
        tagName: 'div',
        id: 'competition-map',
        initialize: function(options) {
            this.defaults();
            if (options) {
                if (options.suffix)
                    this.el.id = this.id + '-' + options.suffix;
                if (options.geoJson)
                    this.geoJson = options.geoJson;
                if (options.editable)
                    this.editable = true;
            }
        },
        defaults: function() {
            this.center = [43.361881, -8.416068];
            this.zoom = 13;
            this.tilesUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            this.tilesUrlHosts = ["a", "b", "c"];
            this.geoJson = {"type": "FeatureCollection",
                "features": []
            };
            this.bounds = [];
        },
        render: function() {
            return this;
        },
        renderMap: function() {
            this.map = L.map(this.el.id);
            L.tileLayer(this.tilesUrl, {
                subdomains: this.tilesUrlHosts,
                reuseTiles: true
            }).addTo(this.map);
            if (this.geoJson && this.geoJson.features.length > 0) {
                L.geoJson(this.geoJson, {
                    onEachFeature: this.setGeoJsonFeature,
                    pointToLayer: this.setGeoJsonPoint
                }).addTo(this.map);
                _.each(this.geoJson.features, function(feature) {
                    this.bounds.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]);
                }, this);
                this.map.fitBounds(this.bounds);
            } else {
                this.map.setZoom(this.zoom);
                this.map.setView(this.center);
            }
            if (this.editable) {
                this.map.on('click', this.setMapPoint, this);
            }
            return this;
        },
        setGeoJsonPoint: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 8,
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        setGeoJsonFeature: function(feature, layer) {
            if (feature.properties && feature.properties.date_time) {
                layer.bindPopup(feature.properties.date_time);
            }
        },
        setMapPoint: function(e) {
            var feature = {"type": "Feature",
                "geometry": {"type": "Point", "coordinates": [e.latlng.lng, e.latlng.lat]},
                "properties": {"order": this.geoJson.features.length}
            };
            this.geoJson.features.push(feature);
            this.setGeoJsonPoint(feature, e.latlng).addTo(this.map);
        },
        close: function() {
            this.unbind();
            this.remove();
        }
    });
    return MapView;
});