define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'form',
    'notif-handler',
    'views/common/view',
    'text!/web/templates/common/list.html'
], function($, _, Backbone, ViewHolder, Form, NotificationHandler, CommonView, template) {
    var CommonListView = Backbone.View.extend({
        tagName: 'ul',
        initialize: function(options) {
            this.viewHolder = new ViewHolder();
            this.prefix = options.prefix;
            this.listenTo(this.collection, 'add remove', this.render);
        },
        events: {
            'click .create': 'createElement'
        },
        render: function() {
            this.viewHolder.closeAll();
            this.$el.html(_.template(template, {prefix: this.prefix, collection: this.collection}));
            this.collection.each(this.renderElementView, this);
            return this;
        },
        renderElementView: function(model, index, list) {
            var view = new CommonView({prefix: this.prefix + model.id + '-', model: model});
            this.viewHolder.register('elementView' + index, view);
            this.$("#" + this.prefix + "list").append(view.render().el);
        },
        createElement: function(event) {
            var values = Form.toObject(this, this.prefix + 'new-');
            this.collection.create(values, {
                wait: true,
                success: NotificationHandler.onModelSaveSuccess,
                error: NotificationHandler.onServerError}
            );
        },
        close: function() {
            this.viewHolder.closeAll();
            this.unbind();
            this.remove();
        }
    });
    return CommonListView;
});

