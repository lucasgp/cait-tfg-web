var app = app || {};

var CompetitionList = Backbone.Collection.extend({
	
	model: app.Competition,
	
	collectionName: 'competitions',
	
	url: '/api/competitions',

});

app.Competitions = new CompetitionList();
