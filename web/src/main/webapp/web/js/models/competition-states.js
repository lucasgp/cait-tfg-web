define([
    'backbone'
], function(Backbone) {

    var CompetitionStateModel = Backbone.Model.extend({
        urlRoot: '/resources/competition_states',
        initialize: function() {

        },
        defaults: {
            id: null,
            name: null,
            description: null,
            version: null
        }
    });

    return CompetitionStateModel;
}
);
