define([
    'page',
    'views/app'
], function(Page, AppView) {

    var AppRouter = Backbone.Router.extend({
        view: null,
        routes: {
            '(/)': 'default',
            'competitions(/:page/:size)': 'showCompetitions',
            'competition/:id': 'showCompetitionDetail',
            'createCompetition': 'showCreateCompetition',
            'signup(/)': 'showSignup',
            '*path(/)': 'default'
        },
        default: function(path) {
            this.showCompetitions();
        },
        showCompetitions: function(page, size) {
            var query = new Page.Query({
                page: page ? page : 0,
                size: size ? size : 20,
                sortProperty: 'startDate',
                sortOrder: 'DESC'
            });
            this.view.showCompetitions(query);
        },
        showCompetitionDetail: function(id) {
            this.view.showCompetitionDetail(id);
        },
        showCreateCompetition: function() {
            this.view.showCreateCompetition();
        },
        showSignup: function() {
            this.view.showSignup();
        },
        initialize: function(options) {
            this.view = new AppView().render();
        }
    });
    return AppRouter;
});