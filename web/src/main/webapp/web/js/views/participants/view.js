define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'views/map/map',
    'text!/web/templates/participants/view.html'
], function($, _, Backbone, ViewHolder, MapView, template) {
    var ParticipantView = Backbone.View.extend({
        tagName: 'li',
        className: 'participant',
        initialize: function() {
            this.viewHolder = new ViewHolder();
        },
        render: function() {
            this.$el.append(_.template(template, this.model.toJSON()));
            this.viewHolder.close('mapView');
            if (this.model.get('tracking') && this.model.get('tracking').get('geoJson')
                    && this.model.get('tracking').get('geoJson').features.length > 0) {
                this.$el.on("click", "#participant-tracking-" + this.model.get('tracking').id, {
                    viewHolder: this.viewHolder
                }, this.renderMap);
                var view = new MapView({
                    geoJson: this.model.get('tracking').get('geoJson'),
                    suffix: this.model.get('tracking').id,
                    className: 'tracking-map'
                });
                this.viewHolder.register('mapView', view);
                this.$("#map-wrapper-" + this.model.get('tracking').id).append(view.render().el);
            }
            return this;
        },
        renderMap: function(event) {
            event.data.viewHolder.get('mapView').renderMap();
        },
        close: function() {
            this.viewHolder.closeAll();
            this.unbind();
            this.remove();
        }
    });

    return ParticipantView;
});
