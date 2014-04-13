define([
    'jquery-ui',
    'underscore',
    'backbone',
    'text!/web/templates/competitions/add.html'
], function($, _, Backbone, template) {
    var AddCompetitionView = Backbone.View.extend({
        tagName: 'div',
        className: 'add-competition',
        competitions: null,
        initialize: function(options) {

            this.competitions = options.competitions;

            this.$inputName = this.$('#competition-name');
            this.$inputDescription = this.$('#competition-description');
            this.$startDate = this.$('#competition-start-date');
            this.$finishDate = this.$('#competition-finish-date');
            this.$startDate.datepicker({dateFormat: "yy-mm-dd"});
            this.$finishDate.datepicker({dateFormat: "yy-mm-dd"});
            return this;
        },
        events: {
            'click #submit-competition': 'create',
        },
        render: function() {
            var compiledTemplate = _.template(template, {});
            this.$el.append(compiledTemplate);
            return this;
        },
        create: function(event) {
            this.competitions.create({
                name: this.$inputName.val().trim(),
                description: this.$inputDescription.val().trim(),
                startDate: this.$startDate.val().trim(),
                finishDate: this.$finishDate.val().trim()
            }, {wait: true});
        }

    });
    return AddCompetitionView;
});

