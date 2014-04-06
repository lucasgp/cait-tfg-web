var app = app || {};

$(function() {
    new app.AppView();
    app.Competitions.findMostRecent(new Query({
        page: 0,
        size: 5,
        sortProperty: 'startDate',
        sortOrder: 'DESC'
    }));
});