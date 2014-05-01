package es.lucasgp.cait.tfg.competition.model;

import java.util.ArrayList;
import java.util.Collection;

public final class UserRole extends BaseEntity {

    private String userId;
    private Collection<String> roleTypesId = new ArrayList<>();

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(final String userId) {
        this.userId = userId;
    }

    public Collection<String> getRoleTypesId() {
        return roleTypesId;
    }

    public void setRoleTypesId(Collection<String> roleTypesId) {
        this.roleTypesId = roleTypesId;
    }

}
