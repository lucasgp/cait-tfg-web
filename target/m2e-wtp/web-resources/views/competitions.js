var app = app || {};

app.CompetitionView = Backbone.View.extend({

	tagname : 'li',

	competitionTpl : _.template($('#item-template').html()),

	events : {
		'click .destroy' : 'deleteCompetition'
	},

	initialize : function() {
		this.listenTo(this.model, 'destroy', this.hide);
	},

	render : function() {
		this.$el.html(this.competitionTpl(this.model.toJSON()));
		return this;
	},
	
	hide: function() {
		this.$el.html('');
	},

	deleteCompetition : function(event) {
		this.model.destroy();
	}

});
