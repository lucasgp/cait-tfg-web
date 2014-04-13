define([
    'jquery-ui',
    'underscore',
    'backbone',
    'view-holder',
    'collections/competitions',
    'views/users/add',
    'views/competitions/add',
    'views/competitions/list'
], function($, _, Backbone, ViewHolder, CompetitionsCollection, AddUserView, AddCompetitionView, CompetitionsListView) {
    var AppView = Backbone.View.extend({
        el: '#main',
        competitions: null,
        viewHolder: {},
        initialize: function() {

            this.viewHolder = new ViewHolder({parent: this});

            this.competitions = new CompetitionsCollection();

            this.viewHolder.register('addUserView', new AddUserView());
            this.viewHolder.register('addCompetitionView', new AddCompetitionView({competitions: this.competitions}));
            this.viewHolder.register('competitionsListView', new CompetitionsListView({competitions: this.competitions}));

        },
        events: {
        },
        showCompetitions: function(query) {
            this.viewHolder.hideAll();
            this.competitions.findByQuery(query);
            this.viewHolder.show('competitionsListView');
        },
        showCreateCompetition: function() {
            this.viewHolder.hideAll();
            this.viewHolder.show('addCompetitionView');
        },
        showSignup: function() {
            this.viewHolder.hideAll();
            this.viewHolder.show('addUserView');
        },
        render: function() {
            this.viewHolder.hideAll();
            this.viewHolder.show('competitionsListView');
            return this;
        }
    });
    return AppView;
});

