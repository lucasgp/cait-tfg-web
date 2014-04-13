define([
    'jquery-ui',
    'underscore',
    'backbone',
    'form',
    'events',
    'text!/web/templates/competitions/add.html'
], function($, _, Backbone, Form, Channel, template) {
    var AddCompetitionView = Backbone.View.extend({
        tagName: 'div',
        className: 'add-competition',
        competitions: null,
        initialize: function(options) {
            this.competitions = options.competitions;
            return this;
        },
        events: {
            'click #submit-competition': 'create'
        },
        render: function() {
            var compiledTemplate = _.template(template, {});
            this.$el.append(compiledTemplate);

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            this.$inputName = this.$('#competition-name');
            this.$inputDescription = this.$('#competition-description');
            this.$startDate = this.$('#competition-startDate');
            this.$finishDate = this.$('#competition-finishDate');
            this.$startDate.datepicker({dateFormat: "yy-mm-dd"}).datepicker('setDate', tomorrow);
            this.$finishDate.datepicker({dateFormat: "yy-mm-dd"}).datepicker('setDate', tomorrow);

            return this;
        },
        create: function(event) {
            var values = Form.toObject(this, 'competition-');
            this.competitions.create(values, {wait: true});
            Channel.trigger("competition:added");
        }

    });
    return AddCompetitionView;
});

