var app = app || {};

app.CompetitionView = Backbone.View.extend({
	
	tagname: 'li',
	
	competitionTpl: _.template($('#item-template').html()),
	
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},
	
	render: function() {
		this.$el.html( this.competitionTpl( this.model.toJSON() ) );
		return this;
	}
	
});
