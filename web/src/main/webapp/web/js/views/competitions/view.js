define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'date',
    'tracking-data',
    'views/map/map',
    'text!/web/templates/competitions/view.html',
    'text!/web/templates/competitions/view_simple.html'
], function($, _, Backbone, ViewHolder, DateUtils, TrackingData, MapView, competitionTemplate, competitionSimpleTemplate) {
    var CompetitionView = Backbone.View.extend({
        tagName: 'li',
        className: 'card',
        initialize: function(options) {
            this.viewHolder = new ViewHolder();
            this.simple = options.simple || false;
            this.tracking = options.tracking || null;
            if (this.tracking) {
                this.trackingData = new TrackingData();
                this.trackingData.addGeoJSON(this.tracking.get('geoJson'));
            }
        },
        render: function() {
            this.viewHolder.close('mapView');

            var template = this.simple ? competitionSimpleTemplate : competitionTemplate;
            var params = this.model.toJSON();
            params['tracking'] = this.tracking ? this.tracking.toJSON() : {};
            params['DateUtils'] = DateUtils;
            this.$el.append(_.template(template, params));

            if (this.tracking) {
                var $mapElement = this.$("#map-wrapper-" + this.tracking.id);
                $mapElement.hide();
                if (this.tracking && this.tracking.get('geoJson') && this.tracking.get('geoJson').features.length > 0) {
                    this.$el.on("click", "#participant-tracking-" + this.tracking.id, {
                        this: this,
                        $mapElement: $mapElement
                    }, this.renderMap, this);
                }
            }
            return this;
        },
        renderMap: function(event) {
            var $mapElement = event.data.$mapElement;
            event.data.this.viewHolder.close('mapView');
            var view = new MapView({
                geoJson: event.data.this.trackingData.geoJSON,
                suffix: event.data.this.model.id,
                className: 'tracking-map'
            });
            event.data.this.viewHolder.register('mapView', view);
            $mapElement.append(view.render().el);
            $mapElement.dialog({
                width: $(window).width() * 0.5,
                height: $(window).width() * 0.3,
                open: function() {
                    $("#overlay").show();
                },
                close: function() {
                    $("#overlay").hide();
                }
            });
            event.data.this.viewHolder.get('mapView').renderMap();
        },
        close: function() {
            this.unbind();
            this.remove();
        }
    });
    return CompetitionView;
});
