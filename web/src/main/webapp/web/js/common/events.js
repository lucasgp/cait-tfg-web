define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var Channel = _.extend({}, Backbone.Events);
    return Channel;
});