define([
    'backbone'
], function(Backbone) {

    var ParticipantModel = Backbone.Model.extend({
        idAttribute: "userId",
        initialize: function(options) {
            if (options && options.competitionId) {
                this.urlRoot = '/resources/competitions/' + options.competitionId + '/participants';
                this.unset('competitionId', {silent: true});
            }
        }
    });

    return ParticipantModel;
}
);
