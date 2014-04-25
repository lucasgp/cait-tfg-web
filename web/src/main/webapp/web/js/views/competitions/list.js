define([
    'jquery',
    'underscore',
    'backbone',
    'view-holder',
    'form',
    'page',
    'views/competitions/view',
    'text!/web/templates/competitions/list.html'
], function($, _, Backbone, ViewHolder, Form, Page, CompetitionView, competitionListTemplate) {
    var CompetitionsListView = Backbone.View.extend({
        initialize: function(options) {

            this.viewHolder = new ViewHolder();
            this.competitions = options.competitions;
            this.query = options.query;

            if (options.simple) {
                this.simple = true;
            }
        },
        events: {
            'click #submit-search': 'findCompetitions',
            'click #clear-search': 'clearQueryParams',
            'click #submit-prev': 'findPrevCompetitions',
            'click #submit-next': 'findNextCompetitions',
        },
        render: function() {
            this.viewHolder.closeAll();
            this.$el.html(_.template(competitionListTemplate, {query: this.query, competitions: this.competitions}));
            this.competitions.each(this.createCompetitionView, this);

            this.$("#competition-search-startDate-gte").datepicker({dateFormat: $.t('i18n.' + $.i18n.options.lng + '.dateformat')});
            this.$("#competition-search-startDate-lte").datepicker({dateFormat: $.t('i18n.' + $.i18n.options.lng + '.dateformat')});

            return this;
        },
        createCompetitionView: function(competition, index, list) {
            var view = new CompetitionView({simple: this.simple, model: competition});
            this.viewHolder.register('compView' + index, view);
            this.$("#competition-list").append(view.render().el);
        },
        findPrevCompetitions: function() {
            if (this.query.page > 0) {
                this.query.page -= 1;
            }
            this.findCompetitions();
        },
        findNextCompetitions: function() {
            this.query.page += 1;
            this.findCompetitions();
        },
        findCompetitions: function() {
            var values = Form.toObject(this, 'competition-search-');
            _.each(values, function(value, key) {
                if (value) {
                    this.query.params[key] = value;
                }
            }, this);
            this.competitions.findByQuery(this.query);
        },
        clearQueryParams: function() {
            this.query.params = {};
            this.render();
        },
        close: function() {
            this.viewHolder.closeAll();
            this.unbind();
            this.remove();
        }
    });
    return CompetitionsListView;
});

