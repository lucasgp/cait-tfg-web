define([
    'jquery',
    'underscore',
    'backbone',
    'models/competition-types'
], function($, _, Backbone, CompetitionTypeModel) {

    var CompetitionTypeCollection = Backbone.Collection.extend({
        model: CompetitionTypeModel,
        url: '/resources/competition_types'
    });
    return CompetitionTypeCollection;
}
);
