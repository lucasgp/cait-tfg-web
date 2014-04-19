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
        tagName: 'ul',
        id: 'participants-list',
        initialize: function(options) {
            this.viewHolder = new ViewHolder();
            this.participants = options.participants;
        },
        render: function() {
            if (this.participants && this.participants.length > 0) {
                this.$el.append(_.template(listTemplate, {}));
                _.each(_.sortBy(this.participants, 'score', this), this.createParticipantView, this);
            } else {
                this.$el.append("No participants in this competition yet! Wan't to join?");
            }
            return this;
        },
        createParticipantView: function(participant, index, list) {
            var participantModel = new ParticipantModel({score: participant.score});
            var userModel = new UserModel({id: participant.userId});
            var trackingModel = new TrackingModel({id: participant.trackingId});
            var viewHolder = this.viewHolder;
            var $el = this.$el;
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
                $el.append(view.render().el);
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

