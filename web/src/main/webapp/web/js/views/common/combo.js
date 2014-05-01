define([
    'jquery',
    'underscore',
    'backbone',
    'text!/web/templates/common/combo.html'
], function($, _, Backbone, template) {
    var ComboView = Backbone.View.extend({
        initialize: function(options) {
            this.elementId = options.elementId;
            this.selectedId = options.selectedId ? options.selectedId : -1;
        },
        render: function() {
            this.el = _.template(template, {elementId: this.elementId, selectedId: this.selectedId, collection: this.collection});
            return this;
        },
        close: function() {
            this.unbind();
            this.remove();
        }
    });
    return ComboView;
});

