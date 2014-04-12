define([
    'jquery-ui',
    'underscore',
    'backbone',
    'text!/web/templates/competitions/add.html'
], function($, _, Backbone, addCompetitionTemplate) {
    var AddCompetitionView = Backbone.View.extend({
        tagName: 'div',
        className: 'add-competition',
        competitions: null,
        initialize: function(options) {

            this.competitions = options.competitions;

            this.$inputName = this.$('#new-competition-name');
            this.$inputDescription = this.$('#new-competition-description');
            this.$startDate = this.$('#new-competition-start-date');
            this.$finishDate = this.$('#new-competition-finish-date');
            this.$startDate.datepicker({dateFormat: "yy-mm-dd"});
            this.$finishDate.datepicker({dateFormat: "yy-mm-dd"});
            return this;
        },
        events: {
            'keypress #new-competition-name': 'createOnEnter',
            'keypress #new-competition-description': 'createOnEnter'
        },
        render: function() {
            var compiledTemplate = _.template(addCompetitionTemplate, {});
            this.$el.append(compiledTemplate);
            return this;
        },
        createOnEnter: function(event) {
            if (event.which !== 13) {
                return;
            }

            this.competitions.create({
                name: this.$inputName.val().trim(),
                description: this.$inputDescription.val().trim(),
                startDate: this.$startDate.val().trim(),
                finishDate: this.$finishDate.val().trim()
            }, {wait: true});
            this.$inputName.val('');
            this.$inputDescription.val('');
        }

    });
    return AddCompetitionView;
});

