package es.lucasgp.cait.tfg.competition.dao.impl;

import es.lucasgp.cait.tfg.competition.dao.api.UserRoleDao;
import es.lucasgp.cait.tfg.competition.model.UserRole;
import org.springframework.stereotype.Repository;

@Repository
public class UserRoleDaoMongo extends BaseDaoMongo<UserRole> implements UserRoleDao {

    public UserRoleDaoMongo() {
        super(UserRole.class);
    }
}
