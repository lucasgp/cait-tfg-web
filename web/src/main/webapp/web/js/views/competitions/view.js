define([
    'jquery',
    'underscore',
    'backbone',
    'date',
    'text!/web/templates/competitions/view.html',
    'text!/web/templates/competitions/view_simple.html'
], function($, _, Backbone, DateUtils, competitionTemplate, competitionSimpleTemplate) {
    var CompetitionView = Backbone.View.extend({
        tagName: 'li',
        className: 'card',
        initialize: function(options) {
            if (options && options.simple)
                this.simple = true;
        },
        render: function() {
            var template = this.simple ? competitionSimpleTemplate : competitionTemplate;
            var params = this.model.toJSON();
            params['DateUtils'] = DateUtils;
            this.$el.append(_.template(template, params));
            return this;
        },
        close: function() {
            this.unbind();
            this.remove();
        }
    });
    return CompetitionView;
});
