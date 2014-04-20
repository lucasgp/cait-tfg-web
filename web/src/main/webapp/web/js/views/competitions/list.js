define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'views/competitions/view',
    'text!/web/templates/competitions/list.html',
    'text!/web/templates/empty.html'
], function($, _, Backbone, ViewHolder, CompetitionView, competitionListTemplate, emptyListTemplate) {
    var CompetitionsListView = Backbone.View.extend({
        tagName: 'div',
        id: 'competition-list',
        initialize: function(options) {
            this.viewHolder = new ViewHolder();
            this.competitions = options.competitions;
            if (options.simple) {
                this.simple = true;
            }

        },
        render: function() {
            if (this.competitions && this.competitions.length > 0) {
                this.$el.append(_.template(competitionListTemplate, {}));
                this.competitions.each(this.createCompetitionView, this);
            } else {
                this.$el.append(_.template(emptyListTemplate, {}));
            }
            return this;
        },
        createCompetitionView: function(competition, index, list) {
            var view = new CompetitionView({simple: this.simple, model: competition});
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

