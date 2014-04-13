define([
    'jquery-ui',
    'page',
    'collections/competitions',
    'views/users/add',
    'views/competitions/add',
    'views/competitions/list'
], function($, Page, CompetitionsCollection, AddUserView, AddCompetitionView, CompetitionsListView) {
    var AppView = Backbone.View.extend({
        competitions: null,
        addCompetitionView: null,
        competitionListView: null,
        initialize: function() {

            this.addUserView = new AddUserView();

            this.competitions = new CompetitionsCollection();
            this.addCompetitionView = new AddCompetitionView({competitions: this.competitions});
            this.competitionListView = new CompetitionsListView({competitions: this.competitions});
        },
        events: {
        },
        showCompetitions: function(query) {
            this.competitions.findByQuery(query);
        },
        showSignup: function() {
            this.renderView(this.addUserView);
            this.hideView(this.addCompetitionView);
            this.hideView(this.competitionListView);
        },
        render: function() {
            this.renderView(this.addCompetitionView);
            this.renderView(this.competitionListView);
            return this;
        },
        renderView: function(view) {
            $('#main').append(view.render().el);
        },
        hideView: function(view) {
            $(view.el).hide();
        }
    });
    return AppView;
});

