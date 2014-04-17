define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'error-handler',
    'events',
    'views/map/map',
    'text!/web/templates/competitions/detail.html'
], function($, _, Backbone, ViewHolder, ErrorHandler, Channel, MapView, competitionTemplate) {
    var CompetitionDetailView = Backbone.View.extend({
        tagName: 'div',
        className: 'competition-detail',
        events: {
            'click .destroy': 'deleteCompetition'
        },
        initialize: function() {
            this.viewHolder = new ViewHolder();
            return this;
        },
        render: function() {
            var compiledTemplate = _.template(competitionTemplate, this.model.toJSON());
            this.$el.append(compiledTemplate);
            return this;
        },
        renderMap: function() {
            this.viewHolder.close('mapView');
            var mapView = new MapView({geoJson: this.model.get('route').geoJson});
            this.viewHolder.register('mapView', mapView);
            $('#map-wrapper').append(mapView.render().el);
            mapView.renderMap();
        },
        deleteCompetition: function(event) {
            this.model.destroy({
                wait: true,
                success: function() {
                    Channel.trigger("competition:deleted");
                },
                error: ErrorHandler.onModelFetchError
            });
            this.close();
        },
        close: function() {
            this.unbind();
            this.remove();
        }
    });

    return CompetitionDetailView;
});
