define([
    'backbone'
], function(Backbone) {

    var CompetitionModel = Backbone.Model.extend({
        urlRoot: '/resources/competitions',
        initialize: function() {

        },
        defaults: {
            name: "",
            description: "",
            startDate: new Date() + 1,
            finishDate: new Date() + 1,
            typeId: "",
            stateId: "",
        },
        validate: function(attrs) {
            if (!attrs.name) {
                return 'Name is mandatory';
            }
            if (!attrs.description) {
                return 'Description is mandatory';
            }
            if (!attrs.startDate) {
                return 'Start date is mandatory';
            }
            if (!attrs.finishDate) {
                return 'Finish date is mandatory';
            }
            if (!attrs.typeId) {
                return 'Type is mandatory';
            }
            if (!attrs.stateId) {
                return 'State is mandatory';
            }
        }
    });
    return CompetitionModel;
}
);
