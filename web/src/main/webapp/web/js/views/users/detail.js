define([
    'jquery',
    'underscore',
    'backbone',
    'page',
    'view-holder',
    'notif-handler',
    'models/user-role',
    'collections/competitions',
    'collections/role-types',
    'views/common/combo',
    'views/competitions/list',
    'text!/web/templates/users/detail.html'
], function($, _, Backbone, Page, ViewHolder, NotificationHandler, UserRoleModel, CompetitionCollection, RoleTypeCollection, ComboView, CompetitionListView, template) {
    var UserDetailView = Backbone.View.extend({
        tagName: 'div',
        className: 'user-detail',
        initialize: function() {
            this.viewHolder = new ViewHolder();
        },
        render: function() {
            this.$el.append(_.template(template, this.model.toJSON()));
            this.renderCompetitions();
            this.renderParticipations();
            if (this.$('#role-types').length > 0) {
                this.userRole = new UserRoleModel();
                this.listenTo(this.userRole, 'sync', function() {
                    this.renderRolesCombo();
                });
                this.userRole.getByUserId(this.model.id);
            }
            return this;
        },
        renderCompetitions: function() {
            var competitions = new CompetitionCollection();
            var query = new Page.Query({
                page: 0,
                size: 5,
                sortProperty: 'startDate',
                sortOrder: 'DESC',
                params: {
                    'ownerId': this.model.id
                }
            });
            var viewHolder = this.viewHolder;
            var $appendTo = this.$('#user-competitions');
            this.listenTo(competitions, 'sync', function() {
                var view = new CompetitionListView({query: query, simple: true, competitions: competitions});
                viewHolder.register('userCompetitionsView', view);
                $appendTo.html(view.render().el);
            });
            competitions.findByQuery(query);
        },
        renderParticipations: function() {
            var competitions = new CompetitionCollection();
            var query = new Page.Query({
                page: 0,
                size: 5,
                sortProperty: 'startDate',
                sortOrder: 'DESC',
                params: {
                    'participants.userId': this.model.id
                }
            });
            var viewHolder = this.viewHolder;
            var $appendTo = this.$('#user-participations');
            this.listenTo(competitions, 'sync', function() {
                var view = new CompetitionListView({query: query, simple: true, competitions: competitions});
                viewHolder.register('userParticipationsView', view);
                $appendTo.html(view.render().el);
            });
            competitions.findByQuery(query);
        },
        renderRolesCombo: function() {
            this.viewHolder.close('rolesView');
            var roles = new RoleTypeCollection();
            var selectedId = null;
            if (this.userRole.get('roleTypesId') && this.userRole.get('roleTypesId').length > 0) {
                selectedId = this.userRole.get('roleTypesId')[0];
            }
            var that = this;
            this.listenTo(roles, 'sync', function() {
                var view = new ComboView({elementId: 'user-role-roleTypeId', selectedId: selectedId, collection: roles});
                that.viewHolder.register('rolesView', view);
                that.$('#role-types').html(view.render().el);
                that.$el.on('click', '#submit-role', {this: this}, this.saveUserRole, this);
            });
            roles.fetch();
        },
        saveUserRole: function(event) {
            event.data.this.userRole.save({
                userId: event.data.this.model.id,
                roleTypesId: [event.data.this.$("#user-role-roleTypeId").val()]
            }, {
                wait: true,
                success: NotificationHandler.onModelSaveSuccess,
                error: NotificationHandler.onServerError}
            );
        },
        close: function() {
            this.viewHolder.closeAll();
            this.unbind();
            this.remove();
        }
    });

    return UserDetailView;
});
