var app = app || {};

var CompetitionList = Backbone.Collection.extend({
	
	model: app.Competition,
	
	collectionName: 'competitions',
	
	url: '/api/competitions',
	searchUrl: '/search',
	findByNameUrl: '/findByName',
	
	findByName: function(query) {
		alert($.param(query));
		this.fetch({
			url: this.url + this.searchUrl + this.findByNameUrl + '?' + $.param(query)
		});
	}

});

app.Competitions = new CompetitionList();
