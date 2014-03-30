var app = app || {};

app.CompetitionView = Backbone.View.extend({

	tagName : 'li',
	className: 'competition',

	competitionTpl : _.template($('#item-template').html()),

	events : {
		'click .destroy' : 'deleteCompetition'
	},

	initialize : function() {
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render : function() {
		this.$el.html(this.competitionTpl(this.model.toJSON()));
		return this;
	},
	
//	remove: function() {
//		this.$el.html('');
//	},

	deleteCompetition : function(event) {
		this.model.destroy();
	}

});
