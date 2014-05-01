define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'notif-handler',
    'events',
    'models/competitions',
    'models/users',
    'collections/competitions',
    'collections/users',
    'collections/competition-states',
    'collections/competition-types',
    'collections/role-types',
    'views/users/add',
    'views/users/detail',
    'views/users/list',
    'views/competitions/add',
    'views/competitions/detail',
    'views/competitions/list',
    'views/common/list',
    'text!/web/templates/app.html'
], function($, _, Backbone,
        ViewHolder, NotificationHandler, Channel,
        CompetitionModel, UserModel,
        CompetitionsCollection, UsersCollection, CompetitionStatesCollection, CompetitionTypesCollection, RoleTypesCollection,
        AddUserView, UserDetailView, UsersListView, AddCompetitionView, CompetitionDetailView, CompetitionsListView, CommonListView,
        template) {

    var AppView = Backbone.View.extend({
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
        render: function() {
            this.$el.html(_.template(template));
            return this;
        },
        showCompetitions: function(query) {
            var competitions = new CompetitionsCollection();
            this.listenTo(competitions, 'sync', function() {
                this.switchToView('competitionsListView', new CompetitionsListView({query: query, competitions: competitions}));
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
//                view.renderMap();
            });
            model.fetch({
                error: NotificationHandler.onServerError
            });
        },
        showCompetitionDetail: function(id) {
            var model = new CompetitionModel({id: id});
            this.listenTo(model, 'change', function() {
                var view = new CompetitionDetailView({model: model});
                this.switchToView('competitionDetailView', view);
//                view.renderMap();
            });
            model.fetch({
                error: NotificationHandler.onServerError
            });
        },
        showUsers: function(query) {
            var users = new UsersCollection();
            this.listenTo(users, 'sync', function() {
                this.switchToView('usersListView', new UsersListView({query: query, collection: users}));
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
                error: NotificationHandler.onServerError
            });
        },
        showSignup: function() {
            this.switchToView('addUserView', new AddUserView());
        },
        showAdminUsers: function(query) {
            var users = new UsersCollection();
            this.listenTo(users, 'sync', function() {
                this.switchToView('usersListView', new UsersListView({query: query, collection: users}));
            });
            users.findByQuery(query);
        },
        showAdminUserRoles: function() {
            var collection = new RoleTypesCollection();
            this.listenTo(collection, 'sync', function() {
                this.switchToView('adminRoleTypesView', new CommonListView({
                    prefix: 'admin-role-types-',
                    collection: collection
                }));
            });
            collection.fetch({
                error: NotificationHandler.onServerError
            });
        },
        showAdminCompetitionTypes: function() {
            var collection = new CompetitionTypesCollection();
            this.listenTo(collection, 'sync', function() {
                this.switchToView('adminCompetitionTypesView', new CommonListView({
                    prefix: 'admin-competition-types-',
                    collection: collection
                }));
            });
            collection.fetch({
                error: NotificationHandler.onServerError
            });
        },
        showAdminCompetitionStates: function() {
            var collection = new CompetitionStatesCollection();
            this.listenTo(collection, 'sync', function() {
                this.switchToView('adminCompetitionStatesView', new CommonListView({
                    prefix: 'admin-competition-states-',
                    collection: collection
                }));
            });
            collection.fetch({
                error: NotificationHandler.onServerError
            });
        },
        switchToView: function(viewName, view) {
            this.viewHolder.closeAll();
            this.viewHolder.register(viewName, view);
            $("#main").append(view.render().el);
        }
    });
    return AppView;
});

