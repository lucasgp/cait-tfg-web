package es.lucasgp.cait.tfg.competition.model;

public final class UserRole extends BaseEntity {

    private String userId;
    private String roleTypeId;

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(final String userId) {
        this.userId = userId;
    }

    public String getRoleTypeId() {
        return this.roleTypeId;
    }

    public void setRoleTypeId(final String roleTypeId) {
        this.roleTypeId = roleTypeId;
    }

}
