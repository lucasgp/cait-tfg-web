var app = app || {};

app.Competition = Backbone.Model.extend({
	
	defaults: {
		id: null,
		name: '',
		description: '',
		startDate: new Date(),
		finishDate: new Date()
	},
	
	initialize: function(){
		
		console.log('This competition has been initialized.');
		
		this.on('change', function(){
			console.log('Values for this competition have changed');
		});
	}

});
