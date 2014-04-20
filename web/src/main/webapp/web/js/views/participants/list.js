define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'error-handler',
    'models/participants',
    'models/users',
    'models/trackings',
    'views/participants/view',
    'text!/web/templates/participants/list.html'
], function($, _, Backbone, ViewHolder, ErrorHandler, ParticipantModel, UserModel, TrackingModel, ParticipantView, listTemplate) {
    var ParticipantsListView = Backbone.View.extend({
        initialize: function(options) {
            this.viewHolder = new ViewHolder();
            this.participants = options.participants;
        },
        render: function() {
            this.$el.append(_.template(listTemplate, {participants: this.participants}));
            _.each(_.sortBy(this.participants, 'score', this), this.createParticipantView, this);
            return this;
        },
        createParticipantView: function(participant, index, list) {
            var participantModel = new ParticipantModel({score: participant.score});
            var userModel = new UserModel({id: participant.userId});
            var trackingModel = new TrackingModel({id: participant.trackingId});
            var viewHolder = this.viewHolder;
            $.when(userModel.fetch({
                error: ErrorHandler.onModelFetchError
            }),
                    trackingModel.fetch({
                        error: ErrorHandler.onModelFetchError
                    })).done(function() {
                participantModel.set('user', userModel);
                participantModel.set('tracking', trackingModel);
                var view = new ParticipantView({model: participantModel});
                viewHolder.register('participantView' + index, view);
                $("#participants-list").append(view.render().el);
            });
        },
        close: function() {
            this.viewHolder.closeAll();
            this.unbind();
            this.remove();
        }
    });
    return ParticipantsListView;
});

