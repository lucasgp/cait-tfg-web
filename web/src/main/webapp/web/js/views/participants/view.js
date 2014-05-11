define([
    'jqueryui',
    'underscore',
    'backbone',
    'sockjs',
    'stomp',
    'view-holder',
    'notif-handler',
    'tracking-data',
    'models/users',
    'models/trackings',
    'views/map/map',
    'text!/web/templates/participants/view.html'
], function($, _, Backbone, SockJS, Stomp,
        ViewHolder, NotificationHandler, TrackingData,
        UserModel, TrackingModel,
        MapView, template) {
    var ParticipantView = Backbone.View.extend({
        tagName: 'li',
        className: 'participant',
        initialize: function(options) {
            this.viewHolder = new ViewHolder();
            this.competition = options.competition;
            var userModel = new UserModel({id: this.model.get('userId')});
            var trackingModel = new TrackingModel({id: this.model.get('trackingId')});
            this.listenTo(userModel, 'sync', this.renderUser, this);
            this.listenTo(trackingModel, 'sync', this.renderTracking, this);
            userModel.fetch({
                error: NotificationHandler.onServerError
            });
            trackingModel.fetch({
                error: NotificationHandler.onServerError
            });
        },
        events: {
            'click .delete': 'removeParticipant'
        },
        render: function() {
            this.viewHolder.close('mapView');
            var params = this.model.toJSON();
            params['ownerId'] = this.competition.get('ownerId');
            this.$el.append(_.template(template, params));

            this.$("#participant-tracking-" + this.model.get('trackingId')).hide();
            this.$("#map-wrapper-" + this.model.get('trackingId')).hide();

            var participantNewScoreElementId = "#participant-new-score-" + this.model.get('userId');
            if (this.$(participantNewScoreElementId).length > 0) {
                this.$el.on("blur", participantNewScoreElementId, {this: this}, this.updateScore, this);
            }

            return this;
        },
        renderUser: function(model, resp, options) {
            this.$("#participant-username-" + this.model.get('userId')).text(model.get('username'));
        },
        renderTracking: function(model, resp, options) {

            if (model.get('geoJson') && model.get('geoJson').features.length > 0) {

                this.$("#participant-tracking-" + model.id).show();

                this.$el.on("click", "#participant-tracking-" + model.id, {
                    this: this,
                    $mapElement: this.$("#map-wrapper-" + model.id),
                    model: model
                }, this.renderMap, this);
            }
        },
        renderMap: function(event) {
            var $mapElement = event.data.$mapElement;
            event.data.this.viewHolder.close('mapView');

            var socket = new SockJS("/resources/tracking");
            var stompClient = Stomp.over(socket);

            var trackingData = new TrackingData({
                trackingId: event.data.model.id
            });
            trackingData.addGeoJSON(event.data.model.get('geoJson'));

            var view = new MapView({
                geoJson: trackingData.geoJSON,
                suffix: event.data.model.id,
                className: 'tracking-map'
            });
            event.data.this.viewHolder.register('mapView', view);
            $mapElement.append(view.render().el);
            $mapElement.dialog({
                width: $(window).width() * 0.5,
                height: $(window).width() * 0.3,
                title: event.data.model.get("startDate"),
                open: function() {
                    $("#overlay").show();
                },
                close: function() {
                    $("#overlay").hide();
                    stompClient.disconnect();
                }
            });
            event.data.this.viewHolder.get('mapView').renderMap();

            stompClient.connect({}, function(frame) {
                stompClient.subscribe("/topic/tracking:participant/" + trackingData.trackingId, function(message) {
                    var feature = $.parseJSON(message.body).payload;
                    trackingData.addFeature(feature);
                    event.data.this.viewHolder.get('mapView').addTrackingLocation(feature);
                });
            });
        },
        updateScore: function(event) {
            var newValue = $(event.target).val();
            var oldValue = event.data.this.model.get('score');
            if (newValue != oldValue) {
                event.data.this.model.save({
                    score: newValue
                }, {
                    wait: true,
                    success: NotificationHandler.onModelSaveSuccess,
                    error: NotificationHandler.onServerError
                });
            }
        },
        removeParticipant: function() {
            NotificationHandler.confirmAction(function() {
                this.model.destroy({
                    wait: true,
                    success: NotificationHandler.onModelDeleteSuccess,
                    error: NotificationHandler.onServerError
                });
            }, this);
        },
        close: function() {
            this.viewHolder.closeAll();
            this.unbind();
            this.remove();
        }
    });
    return ParticipantView;
});
