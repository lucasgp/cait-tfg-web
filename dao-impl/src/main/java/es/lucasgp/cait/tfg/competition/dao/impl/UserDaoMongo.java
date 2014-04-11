package es.lucasgp.cait.tfg.competition.dao.impl;

import es.lucasgp.cait.tfg.competition.dao.api.UserDao;
import es.lucasgp.cait.tfg.competition.model.User;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoMongo extends BaseDaoMongo<User> implements UserDao {

    public UserDaoMongo() {
        super(User.class);
    }
}
