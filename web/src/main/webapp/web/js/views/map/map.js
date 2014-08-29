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
            //this.tilesUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            //this.tilesUrlHosts = ["a", "b", "c"];
            //http://toolserver.org/tiles/hikebike/12/2213/1373.png
            this.tilesUrl = 'http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png';
            this.tilesUrlHosts = ["a", "b", "c"];
            //this.tilesUrl = 'http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png';
            //this.tilesUrlHosts = ["otile1", "otile2", "otile3", "otile4"];
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
                _.each(this.geoJson.features, function(feature, index, features) {
                    lineString.coordinates.push(feature.geometry.coordinates);
                    if (index === 0) {
                        feature.properties.start = true;
                    } else if (index === features.length - 1) {
                        feature.properties.finish = true;
                    }
                });
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

            var legend = L.control({position: 'bottomright'});

            legend.onAdd = function(map) {

                var div = L.DomUtil.create('div', 'mapLegend');

                div.innerHTML += '<i style="background:#3E87D1"></i> Start<br>'
                        + '<i style="background:#2EB82E"></i> Finish<br>';

                return div;
            };

            legend.addTo(this.map);

            return this;
        },
        setGeoJsonPoint: function(feature, latlng) {
            if (feature.properties.start) {
                return L.circleMarker(latlng, {
                    radius: 10,
                    fillColor: "#3E87D1",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 1
                });
            } else if (feature.properties.finish) {
                return L.circleMarker(latlng, {
                    radius: 10,
                    fillColor: "#2EB82E",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 1
                });
            } else {
                return L.circleMarker(latlng, {
                    radius: 6,
                    fillColor: feature.properties.color || "#ff7800",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            }
        },
        setGeoJsonFeature: function(feature, layer) {
            if (feature && feature.geometry && feature.geometry.type === 'Point') {
                var content = '';
                if (feature.properties) {

                    var dateTime = feature.properties.timestamp ? new Date(feature.properties.timestamp) : null;
                    if (dateTime) {
                        content += 'Timestamp: ';
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
                    content += '<br/>Distance: ';
                    content += feature.properties.distance ? parseFloat(feature.properties.distance).toFixed(2).toLocaleString() : '0';
                    content += ' meters';
                    if (feature.properties.order === null) {
                        var accTime = feature.properties.accumulatedTime || null;
                        if (accTime) {
                            var seconds = (accTime / 1000) % 60;
                            var minutes = (accTime / (1000 * 60)) % 60;
                            var hours = (accTime / (1000 * 60 * 60));
                            content += '<br/>Accumulated time: ';
                            content += hours < 10 ? '0' : '';
                            content += hours.toFixed(0);
                            content += ':';
                            content += minutes < 10 ? '0' : '';
                            content += minutes.toFixed(0);
                            content += ':';
                            content += seconds < 10 ? '0' : '';
                            content += seconds.toFixed(0);
                        }
                        content += '<br/>Avg Speed: ';
                        content += feature.properties.avgSpeed ? parseFloat(feature.properties.avgSpeed).toFixed(2) : '0';
                        content += ' km/h';
                        content += '<br/>Current Speed: ';
                        content += feature.properties.currentSpeed ? parseFloat(feature.properties.currentSpeed).toFixed(2) : '0';
                        content += ' km/h';
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
        addTrackingLocation: function(feature) {
            this.geoLayer.addData(feature);
        },
        close: function() {
            this.unbind();
            this.remove();
        }
    });
    return MapView;
});