define([
    'jquery',
    'underscore',
    'backbone',
    'models/comments'
], function($, _, Backbone, CommentModel) {

    var CommentCollection = Backbone.Collection.extend({
        model: CommentModel,
        comparator: function(a, b) {
            return b.get('commentDate') - a.get('commentDate');
        },
        initialize: function(models, options) {
            this.competitionId = options.competitionId;
        },
        url: function() {
            return '/resources/competitions/' + this.competitionId + '/comments';
        }
    });
    return CommentCollection;
}
);
