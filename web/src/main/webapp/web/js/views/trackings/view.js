define([
    'jqueryui',
    'underscore',
    'backbone',
    'tracking-data',
    'view-holder',
    'views/map/map',
    'text!/web/templates/trackings/view.html'
], function($, _, Backbone,
        TrackingData, ViewHolder, MapView, template) {
    var TrackingView = Backbone.View.extend({
        tagName: 'li',
        className: 'tracking',
        initialize: function() {
            this.viewHolder = new ViewHolder();
            this.trackingData = new TrackingData();
            this.trackingData.addGeoJSON(this.model.get('geoJson'));
        },
        render: function() {
            this.viewHolder.close('mapView');
            this.$el.append(_.template(template, this.model.toJSON()));
            var $mapElement = this.$("#map-wrapper-" + this.model.id);
            $mapElement.hide();
            if (this.model.get('geoJson') && this.model.get('geoJson').features.length > 0) {
                this.$el.on("click", "#participant-tracking-" + this.model.id, {
                    this: this,
                    $mapElement: $mapElement
                }, this.renderMap, this);
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
            this.viewHolder.closeAll();
            this.unbind();
            this.remove();
        }
    });
    return TrackingView;
});
