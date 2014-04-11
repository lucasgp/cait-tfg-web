package es.lucasgp.cait.tfg.competition.dao.impl;

import es.lucasgp.cait.tfg.competition.dao.api.RoleTypeDao;
import es.lucasgp.cait.tfg.competition.model.RoleType;
import org.springframework.stereotype.Repository;

@Repository
public class RoleTypeDaoMongo extends BaseDaoMongo<RoleType> implements RoleTypeDao {

    public RoleTypeDaoMongo() {
        super(RoleType.class);
    }
}
