define([
    'page',
    'events',
    'error-handler',
    'views/app'
], function(Page, Channel, ErrorHandler, AppView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '(/)': 'showCompetitions',
            'competitions(/:page/:size/:sortProperty/:sortOrder)(/)': 'showCompetitions',
            'competition/:id(/)': 'showCompetitionDetail',
            'create-competition(/)': 'showCreateCompetition',
            'edit-competition/:id(/)': 'showEditCompetition',
            'users(/:page/:size/:sortProperty/:sortOrder)(/)': 'showUsers',
            'user/:id(/)': 'showUserDetail',
            'signup(/)': 'showSignup',
            '*path(/)': 'default'
        },
        initialize: function(options) {
            this.view = new AppView().render();
            Channel.on("competition:added", function(args) {
                this.navigate("competition/" + args.competitionId, {trigger: true});
            }, this);
            Channel.on("competition:deleted", function() {
                this.navigate("competitions", {trigger: true});
            }, this);
            Channel.on("user:created", function(args) {
                window.location = "/web/login.html";
            }, this);

        },
        default: function(path) {
            ErrorHandler.onDefaultRoute();
            this.navigate("competitions", {trigger: true});
        },
        showCompetitions: function(page, size, sortProperty, sortOrder) {
            var query = new Page.Query({
                page: page ? page : 0,
                size: size ? size : 6,
                sortProperty: sortProperty ? sortProperty : 'startDate',
                sortOrder: sortOrder ? sortOrder : 'DESC'
            });
            this.view.showCompetitions(query);
        },
        showCompetitionDetail: function(id) {
            this.view.showCompetitionDetail(id);
        },
        showCreateCompetition: function() {
            this.view.showCreateCompetition();
        },
        showEditCompetition: function(id) {
            this.view.showEditCompetition(id);
        },
        showUsers: function(page, size, sortProperty, sortOrder) {
            var query = new Page.Query({
                page: page ? page : 0,
                size: size ? size : 6,
                sortProperty: sortProperty ? sortProperty : 'username',
                sortOrder: sortOrder ? sortOrder : 'DESC'
            });
            this.view.showUsers(query);
        },
        showUserDetail: function(id) {
            this.view.showUserDetail(id);
        },
        showSignup: function() {
            this.view.showSignup();
        }
    });
    return AppRouter;
});