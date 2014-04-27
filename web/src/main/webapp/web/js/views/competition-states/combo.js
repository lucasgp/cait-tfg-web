define([
    'jquery',
    'underscore',
    'backbone',
    'text!/web/templates/competition_states/combo.html'
], function($, _, Backbone, template) {
    var CompetitionStatesComboView = Backbone.View.extend({
        initialize: function(options) {
            this.formPrefix = options.formPrefix;
            this.selectedId = options.selectedId ? options.selectedId : -1;
        },
        render: function() {
            this.$el.html(_.template(template, {formPrefix: this.formPrefix, selectedId: this.selectedId, competitionStates: this.collection}));
            return this;
        },
        close: function() {
            this.unbind();
            this.remove();
        }
    });
    return CompetitionStatesComboView;
});

