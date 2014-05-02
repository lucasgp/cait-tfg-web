define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

    var CommentModel = Backbone.Model.extend({
        dontSync: ['competitionId'],
        urlRoot: function() {
            return '/resources/competitions/' + this.get('competitionId') + '/comments';
        },
        toJSON: function(options) {
            return _.omit(this.attributes, this.dontSync);
        },
        validate: function(attrs) {
            if (!attrs.title) {
                return 'Title is mandatory';
            }
            if (!attrs.content) {
                return 'Content is mandatory';
            }
        }
    });

    return CommentModel;
}
);
