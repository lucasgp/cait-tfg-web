define([
    'jqueryui',
    'underscore',
    'backbone',
    'view-holder',
    'views/map/map',
    'text!/web/templates/participants/view.html'
], function($, _, Backbone, ViewHolder, MapView, template) {
    var ParticipantView = Backbone.View.extend({
        tagName: 'li',
        className: 'participant',
        initialize: function() {
            this.viewHolder = new ViewHolder();
        },
        render: function() {

            this.viewHolder.close('mapView');
            this.$el.append(_.template(template, this.model.toJSON()));
            var $mapElement = this.$("#map-wrapper-" + this.model.get('tracking').id);
            $mapElement.hide();
            if (this.model.get('tracking') && this.model.get('tracking').get('geoJson')
                    && this.model.get('tracking').get('geoJson').features.length > 0) {

                this.$el.on("click", "#participant-tracking-" + this.model.get('tracking').id, {
                    this: this,
                    $mapElement: $mapElement
                }, this.renderMap, this);
            }

            var participantScoreElementId = "#participant-score-" + this.model.get('user').id;
            var participantScoreFormElementId = "#participant-update-score-" + this.model.get('user').id;
            if (this.$(participantScoreFormElementId).length > 0) {
                this.$(participantScoreFormElementId).hide();
                this.$el.on("click", participantScoreElementId, {
                    this: this,
                    formElementId: participantScoreFormElementId
                }, this.renderUpdateScore, this);
            }

            return this;
        },
        renderMap: function(event) {
            var $mapElement = event.data.$mapElement;
            event.data.this.viewHolder.close('mapView');
            var view = new MapView({
                geoJson: event.data.this.model.get('tracking').get('geoJson'),
                suffix: event.data.this.model.get('tracking').id,
                className: 'tracking-map'
            });
            event.data.this.viewHolder.register('mapView', view);
            $mapElement.append(view.render().el);
            $mapElement.dialog({
                width: $(window).width() * 0.5,
                height: $(window).width() * 0.3,
                title: event.data.this.model.get("user").get("username") + " competition tracking",
                open: function() {
                    $("#overlay").show();
                },
                close: function() {
                    $("#overlay").hide();
                }
            });
            event.data.this.viewHolder.get('mapView').renderMap();
        },
        renderUpdateScore: function(event) {
            event.data.this.$(event.data.formElementId).show();
            event.data.this.$(event.data.formElementId).dialog({
                resize: true,
                minHeight: 1,
                minWidth: 1,
                width: 'auto',
                title: $.t('participant.update-title')
            });
        },
        close: function() {
            this.viewHolder.closeAll();
            this.unbind();
            this.remove();
        }
    });
    return ParticipantView;
});
