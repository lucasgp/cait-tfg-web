define([
    'jquery',
    'underscore',
    'backbone',
    'form',
    'notif-handler',
    'text!/web/templates/common/view.html'
], function($, _, Backbone, Form, NotificationHandler, template) {
    var CommonView = Backbone.View.extend({
        tagName: 'li',
        className: 'card',
        initialize: function(options) {
            this.prefix = options.prefix;
            this.listenTo(this.model, 'change', this.render);
        },
        events: {
            'click .save': 'update',
            'click .delete': 'delete'
        },
        render: function() {
            var params = this.model.toJSON();
            params['prefix'] = this.prefix;
            this.$el.html(_.template(template, params));
            return this;
        },
        update: function(event) {
            var values = Form.toObject(this, this.prefix);
            this.model.save(values, {
                wait: true,
                success: NotificationHandler.onModelSaveSuccess,
                error: NotificationHandler.onServerError}
            );
        },
        delete: function(event) {
            NotificationHandler.confirmAction(function() {
                this.model.destroy({
                    wait: true,
                    success: NotificationHandler.onModelDeleteSuccess,
                    error: NotificationHandler.onServerError
                });
            }, this);
        },
        close: function() {
            this.unbind();
            this.remove();
        }
    });

    return CommonView;
});
