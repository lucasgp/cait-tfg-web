define([
    'jquery',
    'underscore',
    'backbone',
    'page',
    'view-holder',
    'form',
    'date',
    'collections/trackings',
    'collections/competition-types',
    'collections/competition-states',
    'views/competitions/view',
    'views/common/combo',
    'text!/web/templates/competitions/list.html'
], function($, _, Backbone,
        Page, ViewHolder, Form, DateUtils,
        TrackingCollection, CompetitionTypeCollection, CompetitionStateCollection,
        CompetitionView, ComboView, competitionListTemplate) {
    var CompetitionsListView = Backbone.View.extend({
        initialize: function(options) {
            this.viewHolder = new ViewHolder();
            this.competitions = options.competitions;
            this.query = options.query;
            this.simple = options.simple;
            this.formPrefix = 'competition-search-';
        },
        events: {
            'click #submit-search': 'findCompetitions',
            'click #clear-search': 'clearQueryParams',
            'click #submit-prev': 'findPrevCompetitions',
            'click #submit-next': 'findNextCompetitions'
        },
        render: function() {
            this.viewHolder.closeAll();
            this.$el.html(_.template(competitionListTemplate, {DateUtils: DateUtils, query: this.query, simple: this.simple, competitions: this.competitions}));
            this.competitions.each(this.createCompetitionView, this);

            this.$("#competition-search-startDate-gte").datepicker({dateFormat: DateUtils.getFormat()});
            this.$("#competition-search-startDate-lte").datepicker({dateFormat: DateUtils.getFormat()});

            this.renderTypesCombo();
            this.renderStatesCombo();

            return this;
        },
        renderTypesCombo: function() {
            this.viewHolder.close('typesView');
            var types = new CompetitionTypeCollection();
            var that = this;
            this.listenTo(types, 'sync', function() {
                var view = new ComboView({elementId: that.formPrefix + 'typeId', includeOptionAll: true, collection: types});
                that.viewHolder.register('typesView', view);
                that.$('#competition-search-types').html(view.render().el);
            });
            types.fetch();
        },
        renderStatesCombo: function() {
            this.viewHolder.close('statesView');
            var states = new CompetitionStateCollection();
            var that = this;
            this.listenTo(states, 'sync', function() {
                states.forEach(function(state, index, list) {
                    state.set('name', $.t('competition.states.' + state.get('name')));
                }, this);
                var view = new ComboView({elementId: that.formPrefix + 'stateId', includeOptionAll: true, collection: states});
                that.viewHolder.register('statesView', view);
                that.$('#competition-search-states').html(view.render().el);
            });
            states.fetch();
        },
        createCompetitionView: function(competition, index, list) {

            if (this.simple && this.query.params['participants.userId']) {
                var participant = _.find(competition.get('participants'), function(participant) {
                    return participant.userId === this.query.params['participants.userId'];
                }, this);
                if (participant) {
                    var trackings = new TrackingCollection();
                    var query = new Page.Query({
                        page: 0,
                        size: 5,
                        sortProperty: 'startDate',
                        sortOrder: 'DESC',
                        params: {
                            'id': participant.trackingId
                        }
                    });
                    this.listenTo(trackings, 'sync', function() {
                        this.renderCompetitionView(index, competition, trackings.at(0));
                    }, this);
                    trackings.findByQuery(query);
                } else {
                    this.renderCompetitionView(index, competition, null);
                }
            } else {
                this.renderCompetitionView(index, competition, null);
            }
        },
        renderCompetitionView: function(index, competition, tracking) {
            var view = new CompetitionView({simple: this.simple, tracking: tracking, model: competition});
            this.viewHolder.register('compView' + index, view);
            this.$("#competition-list").append(view.render().el);
        },
        findPrevCompetitions: function() {
            if (this.query.page > 0) {
                this.query.page -= 1;
            }
            this.findCompetitions();
        },
        findNextCompetitions: function() {
            this.query.page += 1;
            this.findCompetitions();
        },
        findCompetitions: function() {
            var values = Form.toObject(this, this.formPrefix);
            _.each(values, function(value, key) {
                if (value) {
                    this.query.params[key] = value;
                }
            }, this);
            this.competitions.findByQuery(this.query);
        },
        clearQueryParams: function() {
            this.query.params = {};
            this.render();
        },
        close: function() {
            this.viewHolder.closeAll();
            this.unbind();
            this.remove();
        }
    });
    return CompetitionsListView;
});

