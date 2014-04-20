define([
    'jquery',
    'underscore',
    'backbone',
    'text!/web/templates/competitions/view.html',
    'text!/web/templates/competitions/view_simple.html'
], function($, _, Backbone, competitionTemplate, competitionSimpleTemplate) {
    var CompetitionView = Backbone.View.extend({
        tagName: 'div',
        className: 'competition',
        initialize: function(options) {
            if (options && options.simple)
                this.simple = true;
        },
        render: function() {
            var template = this.simple ? competitionSimpleTemplate : competitionTemplate;
            this.$el.append(_.template(template, this.model.toJSON()));
            return this;
        },
        close: function() {
            this.unbind();
            this.remove();
        }
    });
    return CompetitionView;
});
