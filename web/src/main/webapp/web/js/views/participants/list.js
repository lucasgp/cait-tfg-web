define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'views/participants/view',
    'text!/web/templates/participants/list.html'
], function($, _, Backbone, ViewHolder, ParticipantView, template) {
    var ParticipantsListView = Backbone.View.extend({
        initialize: function(options) {
            this.viewHolder = new ViewHolder();
            this.competition = options.competition;
            this.listenTo(this.collection, 'add remove', this.render);
        },
        render: function() {
            this.viewHolder.closeAll();
            this.$el.html(_.template(template, {participants: this.collection}));
            this.collection.forEach(this.renderParticipantView, this);
            return this;
        },
        renderParticipantView: function(model, index, list) {
            model.set({'competitionId': this.collection.competitionId});
            var view = new ParticipantView({competition: this.competition, model: model});
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

