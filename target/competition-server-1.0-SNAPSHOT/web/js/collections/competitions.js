var app = app || {};

var CompetitionList = HAL.Collection.extend({
	
	model: app.Competition,
	
	url: '/api/competitions',

});

app.Competitions = new CompetitionList();
