define([
    'jquery-ui',
    'underscore',
    'backbone',
    'view-holder',
    'views/competitions/view',
    'text!/web/templates/competitions/list.html'
], function($, _, Backbone, ViewHolder, CompetitionView, competitionListTemplate) {
    var CompetitionsListView = Backbone.View.extend({
        tagName: 'ul',
        id: 'competition-list',
        initialize: function(options) {
            this.viewHolder = new ViewHolder();
            this.competitions = options.competitions;
            this.listenTo(this.competitions, 'add', this.createCompetitionView);
        },
        render: function() {
            var compiledTemplate = _.template(competitionListTemplate, {});
            this.$el.append(compiledTemplate);
            _.each(this.competitions, this.createCompetitionView, this);
            return this;
        },
        createCompetitionView: function(competition, index, list) {
            var view = new CompetitionView({model: competition});
            this.viewHolder.register('compView' + index, view);
            this.$el.append(view.render().el);
        },
        close: function() {
            this.viewHolder.closeAll();
            this.unbind();
            this.remove();
        }
    });
    return CompetitionsListView;
});

