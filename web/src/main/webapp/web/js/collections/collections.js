var app = app || {};

var CompetitionList = Backbone.Collection.extend({
    model: app.Competition,
    collectionName: 'competitions',
    url: '/resources/competitions',
    findMostRecent: function(query) {
        alert($.param(query));
        this.fetch({
            url: this.url.concat("/").concat(query.page)
                    .concat("/").concat(query.size)
                    .concat("/").concat(query.sortProperty)
                    .concat("/").concat(query.sortOrder)
        });
    }

});

app.Competitions = new CompetitionList();
