define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

    var ParticipantModel = Backbone.Model.extend({
        dontSync: ['competitionId'],
        idAttribute: "userId",
        urlRoot: function() {
            return '/resources/competitions/' + this.get('competitionId') + '/participants';
        },
        toJSON: function(options) {
            return _.omit(this.attributes, this.dontSync);
        }
    });

    return ParticipantModel;
}
);
