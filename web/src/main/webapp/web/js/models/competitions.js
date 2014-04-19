define([
    'backbone'
], function(Backbone) {

    var CompetitionModel = Backbone.Model.extend({
        urlRoot: '/resources/competitions',
        initialize: function() {

        },
        validate: function(attrs) {

        }
    });

    return CompetitionModel;
}
);
