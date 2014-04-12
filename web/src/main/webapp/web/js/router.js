define([
    'views/app'
], function(AppView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'main',
            'competitions': 'showCompetitions',
            '*path': 'default'
        },
        main: function() {
            this.showCompetitions();
        },
        showCompetitions: function() {
            new AppView().render();
        },
        default: function(path) {
            this.showCompetitions();
        }
    });
    return AppRouter;
});