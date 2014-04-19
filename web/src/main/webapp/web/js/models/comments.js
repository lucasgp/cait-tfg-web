define([
    'backbone'
], function(Backbone) {

    var CommentModel = Backbone.Model.extend({
        initialize: function(options) {
            if (options && options.competitionId) {
                this.urlRoot = '/resources/competitions/' + options.competitionId + '/comments';
                this.unset('competitionId', {silent: true});
            }
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
