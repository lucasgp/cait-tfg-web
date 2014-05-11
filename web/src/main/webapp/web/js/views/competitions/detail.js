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
    'tracking-data',
    'collections/participants',
    'collections/comments',
    'collections/competition-states',
    'collections/competition-types',
    'views/map/map',
    'views/participants/list',
    'views/comments/list',
    'text!/web/templates/competitions/detail.html'
], function($, _, Backbone, SockJS, Stomp,
        ViewHolder, NotificationHandler, Channel, DateUtils, GeolocationTracking, TrackingData,
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

            this.socket = null;

            var userTrackingId = this.userTrackingId = null;
            if (typeof user !== 'undefined') {
                this.participants.each(function(participant, index, list) {
                    if (participant.get('userId') === user.id) {
                        userTrackingId = participant.get('trackingId');
                    }
                }, this);
            }
            this.userTrackingId = userTrackingId;
            var that = this;
            if (!this.userTrackingId) {
                this.listenTo(this.participants, "add", function(participant) {
                    if (participant && participant.get('trackingId')) {
                        that.userTrackingId = participant.get('trackingId');
                    }
                });
            }
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
                params['isTracking'] = GeolocationTracking.isTracking();

                states.forEach(function(element, index, list) {
                    if (this.model.get('stateId') === element.id) {
                        params['currentState'] = this.currentState = element;
                    }
                    if (element.get('name') === 'Ongoing') {
                        this.ongoingStateId = element.id;
                    }
                    if (element.get('name') === 'Finished') {
                        this.finishedStateId = element.id;
                    }
                }, that);

                that.$el.append(_.template(template, params));
                that.renderParticipants();
                that.renderComments();
                that.renderMap();

                that.subscribeToServerEvents();

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
                var trackingData = new TrackingData();
                trackingData.addGeoJSON(this.model.get('route').geoJson);
                var view = new MapView({geoJson: trackingData.geoJSON});
                this.viewHolder.register('mapView', view);
                $('#map-wrapper').append(view.render().el);
                view.renderMap();
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
            NotificationHandler.confirmAction(function() {
                this.model.destroy({
                    wait: true,
                    success: function() {
                        Channel.trigger("competition:deleted");
                    },
                    error: NotificationHandler.onServerError
                });
            }, this);

        },
        startStopTracking: function() {
            if (GeolocationTracking.isTracking()) {
                this.stopTracking();
            } else {
                this.startTracking();
            }
        },
        startTracking: function() {
            if (!GeolocationTracking.isTracking()) {
                if (!this.userTrackingId) {
                    NotificationHandler.notify('alert', 'Join the competition before start tracking!');
                } else {
                    GeolocationTracking.startTracking({
                        trackingId: this.userTrackingId,
                        interval: 15000,
                        minDisplacement: 50,
                        locationCallback: function(feature) {
                            NotificationHandler.notify('alert', feature.get('geometry').coordinates.join(', '));
                        }});
                }
                this.$('#tracking-icon').addClass("fa-stop");
                this.$('#tracking-icon').removeClass("fa-play");
            }
        },
        stopTracking: function() {
            if (GeolocationTracking.isTracking()) {
                GeolocationTracking.stopTracking();
            }
            this.$('#tracking-icon').addClass("fa-play");
            this.$('#tracking-icon').removeClass("fa-stop");
        },
        subscribeToServerEvents: function() {

            var isTrackingState = this.userTrackingId && this.currentState && this.currentState.get('name') !== 'Finished';
            var isTrackParticipants = this.participants.length > 0;

            if (isTrackingState || isTrackParticipants) {

                var socket = new SockJS("/resources/tracking");
                var stompClient = this.stompClient = Stomp.over(socket);

                var that = this;

                stompClient.connect({}, function(frame) {

                    if (isTrackingState) {
                        stompClient.subscribe("/topic/competition:state/" + that.model.id, function(message) {
                            var competitionStateId = $.parseJSON(message.body).payload;
                            if (that.ongoingStateId === competitionStateId) {
                                that.startTracking();
                            } else if (that.finishedStateId === competitionStateId) {
                                that.stopTracking();
                            }
                        });
                    }

                    if (isTrackParticipants) {

                        var participants = that.participants;
                        var viewHolder = that.viewHolder;

                        participants.forEach(function(participant) {
                            var trackingData = new TrackingData({
                                trackingId: participant.get('trackingId'),
                                color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
                            });
                            stompClient.subscribe("/topic/tracking:participant/" + trackingData.trackingId, function(message) {
                                var feature = $.parseJSON(message.body).payload;
                                trackingData.addFeature(feature);
                                if (viewHolder.get('mapView') != null) {
                                    viewHolder.get('mapView').addTrackingLocation(feature);
                                }
                            });
                        }, that);
                    }
                });
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
