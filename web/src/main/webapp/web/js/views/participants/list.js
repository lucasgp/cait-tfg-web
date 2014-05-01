define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'models/participants',
    'views/participants/view',
    'text!/web/templates/participants/list.html'
], function($, _, Backbone, ViewHolder, ParticipantModel, ParticipantView, listTemplate) {
    var ParticipantsListView = Backbone.View.extend({
        initialize: function(options) {
            this.viewHolder = new ViewHolder();
            this.competition = options.competition;
        },
        render: function() {
            this.$el.append(_.template(listTemplate, {participants: this.collection}));
            _.each(_.sortBy(this.collection, 'score', this).reverse(), this.createParticipantView, this);
            return this;
        },
        createParticipantView: function(participant, index, list) {
            var participantModel = new ParticipantModel({
                competitionId: this.competition.id,
                score: participant.score,
                userId: participant.userId,
                trackingId: participant.trackingId}
            );
            var view = new ParticipantView({model: participantModel});
            this.viewHolder.register('participantView' + index, view);
            this.$("#participants-list").append(view.render().el);

        },
        close: function() {
            this.viewHolder.closeAll();
            this.unbind();
            this.remove();
        }
    });
    return ParticipantsListView;
});

