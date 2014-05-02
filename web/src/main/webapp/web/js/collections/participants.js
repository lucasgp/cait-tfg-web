define([
    'jquery',
    'underscore',
    'backbone',
    'models/participants'
], function($, _, Backbone, ParticipantModel) {

    var ParticipantCollection = Backbone.Collection.extend({
        model: ParticipantModel,
        comparator: 'score',
        initialize: function(models, options) {
            this.competitionId = options.competitionId;
        },
        url: function() {
            return '/resources/competitions/' + this.competitionId + '/participants';
        }
    });
    return ParticipantCollection;
}
);
