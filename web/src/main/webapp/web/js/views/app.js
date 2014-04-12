define([
    'jquery-ui',
    'page',
    'collections/competitions',
    'views/competitions/add',
    'views/competitions/list'
], function($, Page, CompetitionsCollection, AddCompetitionView, CompetitionsListView) {
    var AppView = Backbone.View.extend({
        competitions: null,
        addCompetitionView: null,
        competitionListView: null,
        initialize: function() {

            this.competitions = new CompetitionsCollection();
            this.competitions.findMostRecent(new Page.Query({
                page: 0,
                size: 5,
                sortProperty: 'startDate',
                sortOrder: 'DESC'
            }));

            this.addCompetitionView = new AddCompetitionView({competitions: this.competitions});
            this.competitionListView = new CompetitionsListView({competitions: this.competitions});
        },
        events: {
        },
        render: function() {
            $('#main').append(this.addCompetitionView.render().el);
            $('#main').append(this.competitionListView.render().el);
            return this;
        }
    });
    return AppView;
});

