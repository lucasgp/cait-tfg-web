define([
    'jqueryui',
    'underscore',
    'backbone',
    'form',
    'events',
    'view-holder',
    'error-handler',
    'models/competitions',
    'collections/competition-types',
    'collections/competition-states',
    'views/competition-types/combo',
    'views/competition-states/combo',
    'views/map/map',
    'text!/web/templates/competitions/add.html'
], function($, _, Backbone, Form, Channel, ViewHolder, ErrorHandler, CompetitionModel, CompetitionTypeCollection, CompetitionStateCollection, CompetitionTypeComboView, CompetitionStateComboView, MapView, template) {
    var AddCompetitionView = Backbone.View.extend({
        tagName: 'div',
        className: 'add-competition',
        formPrefix: 'competition-',
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
            this.$('#' + this.formPrefix + 'startDate').datepicker({dateFormat: $.t('i18n.' + $.i18n.options.lng + '.dateformat')}).datepicker('setDate', new Date(this.model.get('startDate')));
            this.$('#' + this.formPrefix + 'finishDate').datepicker({dateFormat: $.t('i18n.' + $.i18n.options.lng + '.dateformat')}).datepicker('setDate', new Date(this.model.get('finishDate')));
            this.$('#map-wrapper').hide();
            this.renderTypesCombo();
            this.renderStatesCombo();
            return this;
        },
        renderTypesCombo: function() {
            this.viewHolder.close('typesView');
            var types = new CompetitionTypeCollection();
            var that = this;
            this.listenTo(types, 'sync', function() {
                var view = new CompetitionTypeComboView({formPrefix: that.formPrefix, selectedId: that.model.get('typeId'), collection: types});
                that.viewHolder.register('typesView', view);
                that.$('#competition-types').html(view.render().el);
            });
            types.fetch();
        },
        renderStatesCombo: function() {
            this.viewHolder.close('statesView');
            var states = new CompetitionStateCollection();
            var that = this;
            this.listenTo(states, 'sync', function() {
                var view = new CompetitionStateComboView({formPrefix: that.formPrefix, selectedId: that.model.get('stateId'), collection: states});
                that.viewHolder.register('statesView', view);
                that.$('#competition-states').html(view.render().el);
            });
            states.fetch();
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
            var values = Form.toObject(this, this.formPrefix);
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

