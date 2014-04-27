define([
    'backbone'
], function(Backbone) {

    var CompetitionTypeModel = Backbone.Model.extend({
        urlRoot: '/resources/competition_types',
        initialize: function() {

        },
        defaults: {
            id: null,
            name: null,
            description: null,
            version: null
        }
    });

    return CompetitionTypeModel;
}
);
