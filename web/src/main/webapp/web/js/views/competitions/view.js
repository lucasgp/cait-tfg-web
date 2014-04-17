define([
    'jquery-ui',
    'underscore',
    'backbone',
    'text!/web/templates/competitions/view.html'
], function($, _, Backbone, competitionTemplate) {
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
        deleteCompetition: function(event) {
            this.model.destroy({wait: true});
            this.close();
        },
        close: function() {
            this.unbind();
            this.remove();
        }
    });

    return CompetitionView;
});
