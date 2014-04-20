define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'error-handler',
    'events',
    'models/competitions',
    'models/users',
    'collections/competitions',
    'collections/users',
    'views/users/add',
    'views/users/detail',
    'views/users/list',
    'views/competitions/add',
    'views/competitions/detail',
    'views/competitions/list'
], function($, _, Backbone, ViewHolder, ErrorHandler, Channel, CompetitionModel, UserModel, CompetitionsCollection, UsersCollection, AddUserView, UserDetailView, UsersListView, AddCompetitionView, CompetitionDetailView, CompetitionsListView) {
    var AppView = Backbone.View.extend({
        el: '#main',
        initialize: function() {
            this.viewHolder = new ViewHolder();
            Channel.on("participant:added", function(args) {
                this.showCompetitionDetail(args.competitionId);
            }, this);
            Channel.on("comment:added", function(args) {
                this.showCompetitionDetail(args.competitionId);
            }, this);
            return this;
        },
        showCompetitions: function(query) {
            var competitions = new CompetitionsCollection();
            this.listenTo(competitions, 'sync', function() {
                this.switchToView('competitionsListView', new CompetitionsListView({competitions: competitions}));
            });
            competitions.findByQuery(query);
        },
        showCreateCompetition: function() {
            this.switchToView('addCompetitionView', new AddCompetitionView());
        },
        showEditCompetition: function(id) {
            var model = new CompetitionModel({id: id});
            this.listenTo(model, 'change', function() {
                var view = new AddCompetitionView({model: model});
                this.switchToView('editCompetitionView', view);
                view.renderMap();
            });
            model.fetch({
                error: ErrorHandler.onModelFetchError
            });
        },
        showCompetitionDetail: function(id) {
            var model = new CompetitionModel({id: id});
            this.listenTo(model, 'change', function() {
                var view = new CompetitionDetailView({model: model});
                this.switchToView('competitionDetailView', view);
                view.renderMap();
            });
            model.fetch({
                error: ErrorHandler.onModelFetchError
            });
        },
        showUsers: function(query) {
            var users = new UsersCollection();
            this.listenTo(users, 'sync', function() {
                this.switchToView('usersListView', new UsersListView({users: users}));
            });
            users.findByQuery(query);

        },
        showUserDetail: function(id) {
            var model = new UserModel({id: id});
            this.listenTo(model, 'change', function() {
                var view = new UserDetailView({model: model});
                this.switchToView('userDetailView', view);
            });
            model.fetch({
                error: ErrorHandler.onModelFetchError
            });
        },
        showSignup: function() {
            this.switchToView('addUserView', new AddUserView());
        },
        render: function() {
            return this;
        },
        switchToView: function(viewName, view) {
            this.viewHolder.closeAll();
            this.viewHolder.register(viewName, view);
            this.$el.append(view.render().el);
        }
    });
    return AppView;
});

