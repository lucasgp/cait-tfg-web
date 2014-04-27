define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'views/trackings/view',
    'text!/web/templates/trackings/list.html'
], function($, _, Backbone, ViewHolder, TrackingView, template) {
    var TrackingsListView = Backbone.View.extend({
        initialize: function(options) {
            this.viewHolder = new ViewHolder();
            this.trackings = options.trackings;
        },
        render: function() {
            this.$el.html(_.template(template, {trackings: this.trackings}));
            this.trackings.each(this.createTrackingView, this);
            return this;
        },
        createTrackingView: function(tracking, index, list) {
            var geoJson = tracking.get('geoJson');
            if (geoJson && geoJson.features && geoJson.features.length > 0) {
                var view = new TrackingView({model: tracking});
                this.viewHolder.register('trackingView' + index, view);
                this.$("#trackings-list").append(view.render().el);
            }
        },
        close: function() {
            this.viewHolder.closeAll();
            this.unbind();
            this.remove();
        }
    });
    return TrackingsListView;
});

