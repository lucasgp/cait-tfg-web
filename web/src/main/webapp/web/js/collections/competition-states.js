define([
    'jquery',
    'underscore',
    'backbone',
    'models/competition-states'
], function($, _, Backbone, CompetitionStateModel) {

    var CompetitionStateCollection = Backbone.Collection.extend({
        model: CompetitionStateModel,
        url: '/resources/competition_states'
    });
    return CompetitionStateCollection;
}
);
