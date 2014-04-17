define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'error-handler',
    'models/competitions',
    'collections/competitions',
    'views/users/add',
    'views/competitions/add',
    'views/competitions/detail',
    'views/competitions/list'
], function($, _, Backbone, ViewHolder, ErrorHandler, CompetitionModel, CompetitionsCollection, AddUserView, AddCompetitionView, CompetitionDetailView, CompetitionsListView) {
    var AppView = Backbone.View.extend({
        el: '#main',
        initialize: function() {
            this.viewHolder = new ViewHolder();
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

