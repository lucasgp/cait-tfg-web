define([
    'jquery',
    'underscore',
    'backbone',
    'error-handler',
    'events',
    'text!/web/templates/competitions/view.html'
], function($, _, Backbone, ErrorHandler, Channel, competitionTemplate) {
    var CompetitionView = Backbone.View.extend({
        tagName: 'li',
        className: 'competition',
        events: {
            'click .destroy': 'deleteCompetition'
        },
        render: function() {
            var compiledTemplate = _.template(competitionTemplate, this.model.toJSON());
            this.$el.append(compiledTemplate);
            return this;
        },
        close: function() {
            this.unbind();
            this.remove();
        }
    });

    return CompetitionView;
});
