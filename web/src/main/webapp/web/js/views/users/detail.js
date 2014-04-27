define([
    'jquery',
    'underscore',
    'backbone',
    'page',
    'view-holder',
    'collections/competitions',
    'collections/trackings',
    'views/competitions/list',
    'views/trackings/list',
    'text!/web/templates/users/detail.html'
], function($, _, Backbone, Page, ViewHolder, CompetitionCollection, TrackingCollection, CompetitionListView, TrackingsListView, template) {
    var UserDetailView = Backbone.View.extend({
        tagName: 'div',
        className: 'user-detail',
        initialize: function() {
            this.viewHolder = new ViewHolder();
        },
        render: function() {
            this.$el.append(_.template(template, this.model.toJSON()));
            this.renderCompetitions();
            this.renderParticipations();
            this.renderTrackings();
            return this;
        },
        renderCompetitions: function() {
            var competitions = new CompetitionCollection();
            var query = new Page.Query({
                page: 0,
                size: 5,
                sortProperty: 'startDate',
                sortOrder: 'DESC',
                params: {
                    'ownerId': this.model.id
                }
            });
            var viewHolder = this.viewHolder;
            var $appendTo = this.$('#user-competitions');
            this.listenTo(competitions, 'sync', function() {
                var view = new CompetitionListView({query: query, simple: true, competitions: competitions});
                viewHolder.register('userCompetitionsView', view);
                $appendTo.html(view.render().el);
            });
            competitions.findByQuery(query);
        },
        renderParticipations: function() {
            var competitions = new CompetitionCollection();
            var query = new Page.Query({
                page: 0,
                size: 5,
                sortProperty: 'startDate',
                sortOrder: 'DESC',
                params: {
                    'participants.userId': this.model.id
                }
            });
            var viewHolder = this.viewHolder;
            var $appendTo = this.$('#user-participations');
            this.listenTo(competitions, 'sync', function() {
                var view = new CompetitionListView({query: query, simple: true, competitions: competitions});
                viewHolder.register('userParticipationsView', view);
                $appendTo.html(view.render().el);
            });
            competitions.findByQuery(query);
        },
        renderTrackings: function() {
            var trackings = new TrackingCollection();
            var query = new Page.Query({
                page: 0,
                size: 5,
                sortProperty: 'startDate',
                sortOrder: 'DESC',
                params: {
                    'userId': this.model.id
                }
            });
            var viewHolder = this.viewHolder;
            var $appendTo = this.$('#user-trackings');
            this.listenTo(trackings, 'sync', function() {
                var view = new TrackingsListView({query: query, trackings: trackings});
                viewHolder.register('userTrackingsView', view);
                $appendTo.html(view.render().el);
            });
            trackings.findByQuery(query);

        },
        close: function() {
            this.viewHolder.closeAll();
            this.unbind();
            this.remove();
        }
    });

    return UserDetailView;
});
