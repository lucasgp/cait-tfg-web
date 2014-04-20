define([
    'jqueryui',
    'underscore',
    'backbone',
    'form',
    'events',
    'view-holder',
    'error-handler',
    'models/competitions',
    'views/map/map',
    'text!/web/templates/competitions/add.html'
], function($, _, Backbone, Form, Channel, ViewHolder, ErrorHandler, CompetitionModel, MapView, template) {
    var AddCompetitionView = Backbone.View.extend({
        tagName: 'div',
        className: 'add-competition',
        initialize: function(options) {
            this.viewHolder = new ViewHolder();
            if (!this.model) {
                this.model = new CompetitionModel();
            }
            this.model.on('invalid', ErrorHandler.onModelValidationError);
            return this;
        },
        events: {
            'click #submit-competition': 'create',
            'click #show-map': 'renderMap'
        },
        render: function() {
            this.$el.append(_.template(template, this.model.toJSON()));
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            this.$('#competition-startDate').datepicker({dateFormat: "yy-mm-dd"}).datepicker('setDate', tomorrow);
            this.$('#competition-finishDate').datepicker({dateFormat: "yy-mm-dd"}).datepicker('setDate', tomorrow);
            this.$('#map-wrapper').hide();
            return this;
        },
        renderMap: function() {
            this.viewHolder.close('mapView');
            this.$('#map-wrapper').show();
            var mapData = {editable: true};
            if (this.model && this.model.get('route')) {
                mapData['geoJson'] = this.model.get('route').geoJson;
            }
            var mapView = new MapView(mapData);
            this.viewHolder.register('mapView', mapView);
            $('#map-wrapper').append(mapView.render().el);
            mapView.renderMap();
        },
        create: function(event) {
            var values = Form.toObject(this, 'competition-');
            if (this.viewHolder.get('mapView')) {
                values['route'] = {geoJson: this.viewHolder.get('mapView').geoJson};
            }
            this.model.save(values, {
                wait: true,
                success: function(model, response, options) {
                    Channel.trigger("competition:added", {competitionId: model.id});
                },
                error: ErrorHandler.onModelFetchError
            });
        },
        close: function() {
            this.viewHolder.closeAll();
            this.unbind();
            this.remove();
        }
    });
    return AddCompetitionView;
});

