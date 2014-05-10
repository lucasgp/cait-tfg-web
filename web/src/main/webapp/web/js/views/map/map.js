define([
    'jqueryui',
    'underscore',
    'backbone',
    'leaflet',
    'geo',
    'date',
    'notif-handler'
], function($, _, Backbone, L, geoPosition,
        DateUtils, NotificationHandler) {
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
            if (geoPosition.init()) {
                geoPosition.getCurrentPosition(function(p) {
                    this.center = [p.coords.longitude, p.coords.latitude];
                }, function(p) {
                    NotificationHandler.notify('error', p.message);
                }, {enableHighAccuracy: false});
            }
            this.zoom = 13;
            this.tilesUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            this.tilesUrlHosts = ["a", "b", "c"];
            this.geoJson = {"type": "FeatureCollection",
                "features": []
            };
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
                var geoLayer = this.geoLayer = L.geoJson(null, {
                    onEachFeature: this.setGeoJsonFeature,
                    pointToLayer: this.setGeoJsonPoint
                });
                geoLayer.addTo(this.map);
                var lineString = {"type": "LineString",
                    "coordinates": []
                };
                var trackingData = {
                    initTime: null,
                    totalDistance: 0,
                    features: []
                };
                var that = this;
                _.each(this.geoJson.features, function(feature, index, features) {
                    lineString.coordinates.push(feature.geometry.coordinates);
                    trackingData.features.push(feature);
                    that.processTrackingData(feature, trackingData);
                }, this);
                geoLayer.addData(lineString);
                geoLayer.addData(this.geoJson);

                this.map.fitBounds(geoLayer.getBounds());
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
                radius: 6,
                fillColor: feature.properties.color || "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        setGeoJsonFeature: function(feature, layer) {
            if (feature && feature.geometry && feature.geometry.type === 'Point') {
                var content = '';
                if (feature.properties) {

                    content += 'Distance: ';
                    content += feature.properties.distance ? parseFloat(feature.properties.distance).toFixed(2) : '0';
                    content += ' meters';

                    if (feature.properties.order === null) {
                        content += '<br/>Avg Speed: ';
                        content += feature.properties.avgSpeed ? parseFloat(feature.properties.avgSpeed).toFixed(2) : '0';
                        content += ' km/h';

                        var dateTime = feature.properties.timestamp ? new Date(feature.properties.timestamp) : null;
                        if (dateTime) {
                            content += '<br/>Time: ';
                            content += $.datepicker.formatDate(DateUtils.getFormat(), dateTime);
                            content += ' ';
                            content += dateTime.getHours() < 10 ? '0' : '';
                            content += dateTime.getHours();
                            content += ':';
                            content += dateTime.getMinutes() < 10 ? '0' : '';
                            content += dateTime.getMinutes();
                            content += ':';
                            content += dateTime.getSeconds() < 10 ? '0' : '';
                            content += dateTime.getSeconds();
                        }
                    }
                }
                layer.bindPopup(content, {
                });
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
        processTrackingData: function(feature, trackingData) {
            if (trackingData.features.length < 2) {
                trackingData.initTime = feature.properties.timestamp;
            } else {
                var prevFeature = trackingData.features[trackingData.features.length - 2];
                var distance = L.latLng(prevFeature.geometry.coordinates[1], prevFeature.geometry.coordinates[0]).distanceTo(L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]));
                trackingData.totalDistance += distance;
                feature.properties.avgSpeed = (trackingData.totalDistance / 1000) / ((feature.properties.timestamp - trackingData.initTime) / (1000 * 60 * 60));
            }
            feature.properties.distance = trackingData.totalDistance;
            feature.properties.color = trackingData.color || null;
        },
        addTrackingLocation: function(feature, trackingData) {
            this.processTrackingData(feature, trackingData);
            this.geoLayer.addData(feature);
        },
        close: function() {
            this.unbind();
            this.remove();
        }
    });
    return MapView;
});