define([
    'backbone'
], function(Backbone) {

    var ParticipantModel = Backbone.Model.extend({
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
