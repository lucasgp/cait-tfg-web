define([
    'jquery',
    'underscore',
    'backbone',
    'page',
    'events',
    'notif-handler',
    'views/app',
    'loading'
], function($, _, Backbone, Page, Channel, NotificationHandler, AppView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '(/)': 'showCompetitions',
            'lang/:locale(/)': 'setLocale',
            'competitions(/:page/:size/:sortProperty/:sortOrder)(/:paramName/:paramValue)(/)': 'showCompetitions',
            'competition/:id(/)': 'showCompetitionDetail',
            'create-competition(/)': 'showCreateCompetition',
            'edit-competition/:id(/)': 'showEditCompetition',
            'users(/:page/:size/:sortProperty/:sortOrder)(/:paramName/:paramValue)(/)': 'showUsers',
            'user/:id(/)': 'showUserDetail',
            'signup(/)': 'showSignup',
            'admin-users(/)': 'showAdminUsers',
            'admin-user-roles(/)': 'showAdminUserRoles',
            'admin-competition-types(/)': 'showAdminCompetitionTypes',
            'admin-competition-states(/)': 'showAdminCompetitionStates',
            '*path(/)': 'default'
        },
        initialize: function(options) {
            this.view = new AppView();
            $("#content").html(this.view.render().el);
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
            NotificationHandler.onDefaultRoute();
            this.navigate("competitions", {trigger: true});
        },
        setLocale: function(locale) {
            $.i18n.setLng(locale, function() {
            });
            this.navigate("competitions", {trigger: true});
        },
        showCompetitions: function(page, size, sortProperty, sortOrder, paramName, paramValue) {
            var query = new Page.Query({
                page: page ? page : 0,
                size: size ? size : 6,
                sortProperty: sortProperty ? sortProperty : 'startDate',
                sortOrder: sortOrder ? sortOrder : 'DESC',
                params: {}
            });
            if (paramName && paramValue) {
                query.params[paramName] = paramValue;
            }
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
        showUsers: function(page, size, sortProperty, sortOrder, params) {
            var query = new Page.Query({
                page: page ? page : 0,
                size: size ? size : 6,
                sortProperty: sortProperty ? sortProperty : 'username',
                sortOrder: sortOrder ? sortOrder : 'DESC',
                params: {}
            });
            this.view.showUsers(query);
        },
        showUserDetail: function(id) {
            this.view.showUserDetail(id);
        },
        showSignup: function() {
            this.view.showSignup();
        },
        showAdminUsers: function() {
            var query = new Page.Query({
                page: page ? page : 0,
                size: size ? size : 6,
                sortProperty: sortProperty ? sortProperty : 'username',
                sortOrder: sortOrder ? sortOrder : 'DESC',
                params: {}
            });
            this.view.showAdminUsers(query);
        },
        showAdminUserRoles: function() {
            this.view.showAdminUserRoles();
        },
        showAdminCompetitionTypes: function() {
            this.view.showAdminCompetitionTypes();
        },
        showAdminCompetitionStates: function() {
            this.view.showAdminCompetitionStates();
        }
    });
    return AppRouter;
});