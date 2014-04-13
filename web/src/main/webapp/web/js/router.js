define([
    'views/app'
], function(AppView) {

    var AppRouter = Backbone.Router.extend({
        view: null,
        routes: {
            '(/)': 'default',
            'competitions(/:page/:size)': 'showCompetitions',
            'signup(/)': 'showSignup',
            '*path(/)': 'default'
        },
        default: function(path) {
            this.showCompetitions();
        },
        showCompetitions: function(page, size) {
            var query = new Page.Query({
                page: page ? page : 0,
                size: size ? size : 5,
                sortProperty: 'startDate',
                sortOrder: 'DESC'
            });
            this.view.showCompetitions(query);
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