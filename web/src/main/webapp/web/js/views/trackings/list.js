define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'views/trackings/view',
    'text!/web/templates/trackings/list.html'
], function($, _, Backbone, ViewHolder, TrackingView, template) {
    var TrackingsListView = Backbone.View.extend({
        initialize: function(options) {
            this.viewHolder = new ViewHolder();
            this.query = options.query;
        },
        events: {
            'click #submit-prev': 'findPrevTrackings',
            'click #submit-next': 'findNextTrackings'
        },
        render: function() {
            this.$el.html(_.template(template, {query: this.query, trackings: this.collection}));
            this.collection.each(this.createTrackingView, this);
            return this;
        },
        createTrackingView: function(tracking, index, list) {
            var view = new TrackingView({model: tracking});
            this.viewHolder.register('trackingView' + index, view);
            this.$("#trackings-list").append(view.render().el);
        },
        findTrackings: function() {
            this.collection.findByQuery(this.query);
        },
        findPrevTrackings: function() {
            if (this.query.page > 0) {
                this.query.page -= 1;
            }
            this.findTrackings();
        },
        findNextTrackings: function() {
            this.query.page += 1;
            this.findTrackings();
        },
        close: function() {
            this.viewHolder.closeAll();
            this.unbind();
            this.remove();
        }
    });
    return TrackingsListView;
});

