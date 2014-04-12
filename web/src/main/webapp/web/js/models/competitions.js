define([
    'backbone'
], function(Backbone) {

    var CompetitionModel = Backbone.Model.extend({
        // Model Constructor
        initialize: function() {

        },
        defaults: {
            id: null,
            name: '',
            description: '',
            startDate: new Date(),
            finishDate: new Date()
        },
        validate: function(attrs) {

        }
    });

    return CompetitionModel;
}
);
