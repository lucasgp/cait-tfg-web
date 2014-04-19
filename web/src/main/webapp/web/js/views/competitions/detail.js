define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'error-handler',
    'events',
    'form',
    'models/participants',
    'models/comments',
    'views/map/map',
    'views/participants/list',
    'views/comments/list',
    'text!/web/templates/competitions/detail.html'
], function($, _, Backbone, ViewHolder, ErrorHandler, Channel, Form, ParticipantModel, CommentModel, MapView, ParticipantsListView, CommentsListView, competitionTemplate) {
    var CompetitionDetailView = Backbone.View.extend({
        tagName: 'div',
        className: 'competition-detail',
        events: {
            'click .join': 'joinCompetition',
            'click .destroy': 'deleteCompetition',
            'click #submit-comment': 'addComment'
        },
        initialize: function() {
            this.viewHolder = new ViewHolder();
            return this;
        },
        render: function() {
            this.$el.append(_.template(competitionTemplate, this.model.toJSON()));
            this.renderParticipants();
            this.renderComments();
            return this;
        },
        renderParticipants: function() {
            var view = new ParticipantsListView({participants: this.model.get('participants')});
            this.viewHolder.register('participantsView', view);
            this.$el.append(view.render().el);
        },
        renderComments: function() {
            var view = new CommentsListView({comments: this.model.get('comments')});
            this.viewHolder.register('commentsView', view);
            this.$el.append(view.render().el);
        },
        renderMap: function() {
            this.viewHolder.close('mapView');
            if (this.model.get('route')) {
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
        addComment: function(event) {
            var values = Form.toObject(this, 'comment-');
            var comment = new CommentModel({competitionId: this.model.id});
            var competition = this.model;
            comment.on('invalid', function(model, error) {
                alert(error);
            });
            comment.save(values, {
                wait: true,
                success: function() {
                    Channel.trigger("comment:added", {competitionId: competition.id});
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
