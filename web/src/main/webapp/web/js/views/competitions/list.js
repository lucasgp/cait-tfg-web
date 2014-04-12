define([
    'jquery-ui',
    'underscore',
    'backbone',
    'views/competitions/view',
    'text!/web/templates/competitions/list.html'
], function($, _, Backbone, CompetitionView, competitionListTemplate) {
    var CompetitionsListView = Backbone.View.extend({
        tagName: 'ul',
        id: 'competition-list',
        competitions: null,
        initialize: function(options) {
            this.competitions = options.competitions;
            this.listenTo(this.competitions, 'add', this.createCompetitionView);
        },
        render: function() {
            var compiledTemplate = _.template(competitionListTemplate, {});
            this.$el.append(compiledTemplate);
            this.competitions.each(this.createCompetitionView, this);
            return this;
        },
        createCompetitionView: function(competition) {
            var view = new CompetitionView({model: competition});
            this.$el.append(view.render().el);
        }
    });
    return CompetitionsListView;
});

