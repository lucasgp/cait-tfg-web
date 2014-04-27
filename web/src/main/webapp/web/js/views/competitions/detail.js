define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'error-handler',
    'events',
    'models/participants',
    'collections/competition-states',
    'collections/competition-types',
    'views/map/map',
    'views/participants/list',
    'views/comments/list',
    'text!/web/templates/competitions/detail.html'
], function($, _, Backbone, ViewHolder, ErrorHandler, Channel, ParticipantModel, CompetitionStateCollection, CompetitionTypeCollection, MapView, ParticipantsListView, CommentsListView, template) {
    var CompetitionDetailView = Backbone.View.extend({
        tagName: 'div',
        className: 'competition-detail',
        events: {
            'click .join': 'joinCompetition',
            'click .destroy': 'deleteCompetition'
        },
        initialize: function() {
            this.viewHolder = new ViewHolder();
            return this;
        },
        render: function() {
            var states = new CompetitionStateCollection();
            var types = new CompetitionTypeCollection();
            var that = this;
            $.when(
                    states.fetch({
                        error: ErrorHandler.onModelFetchError
                    }),
                    types.fetch({
                        error: ErrorHandler.onModelFetchError
                    })
                    ).done(function() {
                var params = that.model.toJSON();
                params['competitionStates'] = states;
                params['competitionTypes'] = types;
                that.$el.append(_.template(template, params));
                that.renderParticipants();
                that.renderComments();
                that.renderMap();
            });
            return this;
        },
        renderParticipants: function() {
            var view = new ParticipantsListView({participants: this.model.get('participants')});
            this.viewHolder.register('participantsView', view);
            this.$el.append(view.render().el);
        },
        renderComments: function() {
            var view = new CommentsListView({
                comments: this.model.get('comments'),
                competitionId: this.model.id
            });
            this.viewHolder.register('commentsView', view);
            this.$el.append(view.render().el);
        },
        renderMap: function() {
            this.viewHolder.close('mapView');
            if (this.model.get('route') && this.model.get('route').geoJson.features && this.model.get('route').geoJson.features.length > 0) {
                var view = new MapView({geoJson: this.model.get('route').geoJson});
                this.viewHolder.register('mapView', view);
                $('#map-wrapper').append(view.render().el);
                view.renderMap();
            }
        },
        joinCompetition: function(event) {
            var participant = new ParticipantModel({competitionId: this.model.id});
            var competition = this.model;
            participant.save({}, {
                wait: true,
                success: function() {
                    Channel.trigger("participant:added", {competitionId: competition.id});
                },
                error: ErrorHandler.onModelFetchError
            });
        },
        deleteCompetition: function(event) {
            this.model.destroy({
                wait: true,
                success: function() {
                    Channel.trigger("competition:deleted");
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
    return CompetitionDetailView;
});
