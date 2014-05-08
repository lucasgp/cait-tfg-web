define([
    'jquery',
    'underscore',
    'backbone',
    'sockjs',
    'stomp',
    'view-holder',
    'notif-handler',
    'events',
    'date',
    'geo-tracking',
    'models/geo-features',
    'collections/participants',
    'collections/comments',
    'collections/competition-states',
    'collections/competition-types',
    'views/map/map',
    'views/participants/list',
    'views/comments/list',
    'text!/web/templates/competitions/detail.html'
], function($, _, Backbone, SockJS, Stomp,
        ViewHolder, NotificationHandler, Channel, DateUtils, GeolocationTracking,
        GeoFeatureModel,
        ParticipantCollection, CommentCollection, CompetitionStateCollection, CompetitionTypeCollection,
        MapView, ParticipantsListView, CommentsListView, template) {
    var CompetitionDetailView = Backbone.View.extend({
        tagName: 'div',
        className: 'competition-detail',
        events: {
            'click .join': 'joinCompetition',
            'click .destroy': 'deleteCompetition',
            'click .tracking': 'startStopTracking'
        },
        initialize: function() {
            this.viewHolder = new ViewHolder();
            this.participants = new ParticipantCollection(this.model.get('participants'), {competitionId: this.model.id});
            this.comments = new CommentCollection(this.model.get('comments'), {competitionId: this.model.id});
            return this;
        },
        render: function() {
            var states = new CompetitionStateCollection();
            var types = new CompetitionTypeCollection();
            var that = this;
            $.when(
                    states.fetch({
                        error: NotificationHandler.onServerError
                    }),
                    types.fetch({
                        error: NotificationHandler.onServerError
                    })
                    ).done(function() {
                var params = that.model.toJSON();
                params['competitionStates'] = states;
                params['competitionTypes'] = types;
                params['DateUtils'] = DateUtils;
                that.$el.append(_.template(template, params));
                that.renderParticipants();
                that.renderComments();
                that.renderMap();
            });
            return this;
        },
        renderParticipants: function() {
            this.viewHolder.close('participantsView');
            var view = new ParticipantsListView({competition: this.model, collection: this.participants});
            this.viewHolder.register('participantsView', view);
            this.$el.append(view.render().el);
        },
        renderComments: function() {
            this.viewHolder.close('commentsView');
            var view = new CommentsListView({competitionId: this.model.id, collection: this.comments});
            this.viewHolder.register('commentsView', view);
            this.$el.append(view.render().el);
        },
        renderMap: function() {
            this.viewHolder.close('mapView');
            if (this.model.get('route') && this.model.get('route').geoJson.features && this.model.get('route').geoJson.features.length > 0) {
                var view = new MapView({geoJson: this.model.get('route').geoJson});
                this.viewHolder.register('mapView', view);
                $('#map-wrapper').append(view.render().el);
                view.renderMap();

                if (this.participants.length > 0) {

                    var socket = new SockJS("/resources/tracking");
                    var stompClient = this.stompClient = Stomp.over(socket);


                    var participants = this.participants;
                    var viewHolder = this.viewHolder;

                    stompClient.connect({}, function(frame) {
                        participants.forEach(function(participant) {
                            stompClient.subscribe("/topic/tracking:participant/" + participant.get('trackingId'), function(message) {
                                var feature = $.parseJSON(message.body).payload;
                                viewHolder.get('mapView').addPoint(new GeoFeatureModel(feature));
                            });
                        }, this);
                    });
                }
            }
        },
        joinCompetition: function(event) {
            this.participants.create({
                competitionId: this.model.id
            }, {
                wait: true,
                success: NotificationHandler.onModelSaveSuccess,
                error: NotificationHandler.onServerError
            });
        },
        deleteCompetition: function(event) {
            this.model.destroy({
                wait: true,
                success: function() {
                    Channel.trigger("competition:deleted");
                },
                error: NotificationHandler.onServerError
            });
        },
        startStopTracking: function() {
            if (GeolocationTracking.isTracking()) {
                GeolocationTracking.stopTracking();
            } else {
                var trackingId = null;
                this.participants.each(function(participant, index, list) {
                    if (participant.get('userId') === user.id) {
                        trackingId = participant.get('trackingId');
                    }
                }, this);
                var that = this;
                GeolocationTracking.startTracking({
                    trackingId: trackingId,
                    interval: 15000,
                    minDisplacement: 50,
                    locationCallback: function(feature) {
                        NotificationHandler.notify('alert', feature.get('geometry').coordinates.join(', '));
                        if (that.viewHolder.get('mapView')) {
                            that.viewHolder.get('mapView').addPoint(feature);
                        }
                    }});
            }
        },
        close: function() {
            if (this.stompClient) {
                this.stompClient.disconnect();
            }
            this.viewHolder.closeAll();
            this.unbind();
            this.remove();
        }
    });
    return CompetitionDetailView;
});
