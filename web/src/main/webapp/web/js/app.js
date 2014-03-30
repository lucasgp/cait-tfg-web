var app = app || {};

$(function() {
	new app.AppView();
	app.Competitions.findByName(new Query({
		name : 'prueba',
		page : 0,
		size : 3,
		sort : 'startDate'
	}));
});