define([
    'jquery-ui',
    'underscore',
    'backbone',
    'form',
    'events',
    'view-holder',
    'models/competitions',
    'views/map/map',
    'text!/web/templates/competitions/add.html'
], function($, _, Backbone, Form, Channel, ViewHolder, CompetitionModel, MapView, template) {
    var AddCompetitionView = Backbone.View.extend({
        tagName: 'div',
        className: 'add-competition',
        initialize: function(options) {
            this.viewHolder = new ViewHolder();
            return this;
        },
        events: {
            'click #submit-competition': 'create',
            'click #show-map': 'renderMap'
        },
        render: function() {
            this.$el.append(_.template(template, {}));
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            this.$('#competition-startDate').datepicker({dateFormat: "yy-mm-dd"}).datepicker('setDate', tomorrow);
            this.$('#competition-finishDate').datepicker({dateFormat: "yy-mm-dd"}).datepicker('setDate', tomorrow);
            return this;
        },
        renderMap: function() {
            var geoJsonData = null;
            $.ajax({
                url: this.dataUrl,
                success: function(data) {
                    geoJsonData = data;
                }
            });
            this.viewHolder.close('mapView');
            var mapView = new MapView();
            this.viewHolder.register('mapView', mapView);
            $('#map-wrapper').append(mapView.render().el);
            mapView.renderMap();
        },
        create: function(event) {
            var values = Form.toObject(this, 'competition-');
            var comp = new CompetitionModel();
            values['route'] = {geoJson: this.viewHolder.get('mapView').geoJson};
            comp.save(values, {wait: true});
            Channel.trigger("competition:added", this.printPoint, this);
        },
        close: function() {
            this.viewHolder.closeAll();
            this.unbind();
            this.remove();
        }
    });
    return AddCompetitionView;
});

