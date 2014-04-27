define([
    'jquery',
    'underscore',
    'backbone',
    'text!/web/templates/competition_types/combo.html'
], function($, _, Backbone, template) {
    var CompetitionTypesComboView = Backbone.View.extend({
        initialize: function(options) {
            this.formPrefix = options.formPrefix;
            this.selectedId = options.selectedId ? options.selectedId : -1;
        },
        render: function() {
            this.el = _.template(template, {formPrefix: this.formPrefix, selectedId: this.selectedId, competitionTypes: this.collection});
            return this;
        },
        close: function() {
            this.unbind();
            this.remove();
        }
    });
    return CompetitionTypesComboView;
});

