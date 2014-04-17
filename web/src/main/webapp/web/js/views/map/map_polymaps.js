define([
    'jquery-ui',
    'underscore',
    'backbone',
    'polymaps',
    'd3',
    'toGeoJson'
], function($, _, Backbone, Polymaps, d3, toGeoJson) {
    var MapView = Backbone.View.extend({
        tagName: 'div',
        className: 'competition-map',
        zoom: null,
        center: null,
        tilesUrl: null,
        tilesUrlHosts: null,
        dataUrl: null,
        initialize: function(options) {
            this.zoom = options.zoom;
            this.center = options.center;
            this.tilesUrl = 'http://{S}.tile.openstreetmap.org/{Z}/{X}/{Y}.png';
            this.tilesUrlHosts = ["a", "b", "c"];
            this.dataUrl = options.dataUrl;
        },
        render: function() {
            var container = Polymaps.svg("svg");
            this.$el.append(container);
            this.map = Polymaps.map();
            this.map.container(container);
            this.map.add(Polymaps.image().url(Polymaps.url(this.tilesUrl).hosts(this.tilesUrlHosts)));
            this.map.zoom(this.zoom);
            this.map.add(Polymaps.interact());
            this.map.add(Polymaps.hash());
            this.map.add(Polymaps.compass());
//            this.map.add(po.geoJson(po.queue.xml(dataUrl, function(d) {
//                var data = toGeoJson.gpx(d);
//                return data;
//            })).on("load", loadGeoJson));
            var map = this.map;
            this.map.add(Polymaps.geoJson().url(this.dataUrl).on("load", function(e) {
                for (var i = 0; i < e.features.length; i++) {

                    var feature = e.features[i];
                    if (i === 0) {
                        map.center({lon: feature.data.geometry.coordinates[1], lat: feature.data.geometry.coordinates[0]});
                    }

                    feature.element.setAttribute('fill', '#B83D3D');
                    feature.element.setAttribute('r', 5);
                    feature.element.setAttribute('stroke', "black");
                    feature.element.setAttribute('stroke-width', 1);
                    feature.element.appendChild(Polymaps.svg("title").appendChild(document.createTextNode(
                            '[' + feature.data.geometry.coordinates[0] + ', ' + feature.data.geometry.coordinates[1] + '] ' + feature.data.properties.date_time)).parentNode);
                    d3.select(feature.element).attr("r", 20).transition().duration(750).delay(i * 100).attr("r", 5);
                }

            }));
            return this;
        }
    });
    return MapView;
});