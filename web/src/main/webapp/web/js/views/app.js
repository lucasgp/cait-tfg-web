define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'models/competitions',
    'collections/competitions',
    'views/users/add',
    'views/competitions/add',
    'views/competitions/detail',
    'views/competitions/list'
], function($, _, Backbone, ViewHolder, CompetitionModel, CompetitionsCollection, AddUserView, AddCompetitionView, CompetitionDetailView, CompetitionsListView) {
    var AppView = Backbone.View.extend({
        el: '#main',
        initialize: function() {
            this.viewHolder = new ViewHolder();
            return this;
        },
        showCompetitions: function(query) {
            this.viewHolder.closeAll();
            var competitions = new CompetitionsCollection();
            competitions.findByQuery(query);
            var view = new CompetitionsListView({competitions: competitions});
            this.viewHolder.register('competitionsListView', view);
            this.$el.append(view.render().el);
            return this;
        },
        showCreateCompetition: function() {
            this.viewHolder.closeAll();
            var view = new AddCompetitionView();
            this.viewHolder.register('addCompetitionView', view);
            this.$el.append(view.render().el);
            return this;
        },
        showCompetitionDetail: function(id) {
            this.viewHolder.closeAll();
            var model = new CompetitionModel({id: id});
            this.listenTo(model, 'change', function() {
                var view = new CompetitionDetailView({model: model});
                this.viewHolder.register('competitionDetailView', view);
                this.$el.append(view.render().el);
                view.renderMap();
            });
            model.fetch();
            return this;
        },
        showSignup: function() {
            this.viewHolder.closeAll();
            var view = new AddUserView();
            this.viewHolder.register('addUserView', view);
            this.$el.append(view.render().el);
            return this;
        },
        render: function() {
            return this;
        }
    });
    return AppView;
});

