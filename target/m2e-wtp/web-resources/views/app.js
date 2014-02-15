var app = app || {};

app.AppView = Backbone.View.extend({
	
	el: '#app',
	
	initialize: function() {
		this.$inputName = this.$('#new-competition-name'),
		this.$inputDescription = this.$('#new-competition-description'),
		this.$footer = this.$('#footer'),
		this.$main = this.$('#main');
		
		this.listenTo(app.Competitions, 'add', this.addOne);
		this.listenTo(app.Competitions, 'reset', this.addAll);
		this.listenTo(app.Competitions, 'all', this.render);
		
		app.Competitions.fetch();
	},
	
	events: {
		'keypress #new-competition-name': 'createOnEnter',
		'keypress #new-competition-description': 'createOnEnter'
	},
	
	render: function() {
		if(app.Competitions.length) {
			this.$main.show();
			this.$footer.show();
		}
	},

	addOne: function(competition) {
		var view = new app.CompetitionView({ model: competition });
		$('#competition-list').append(view.render().el);
	},

	addAll: function() {
		this.$('competition-list').html('');
		app.Competitions.each(this.addOne, this);
	},
	
	createOnEnter: function(event) {
		if(event.which != 13) {
			return;
		}
		
		app.Competitions.create({name: this.$inputName.val().trim(), description: this.$inputDescription.val().trim()});
		this.$inputName.val('');
		this.$inputDescription.val('');
	}
	
});
