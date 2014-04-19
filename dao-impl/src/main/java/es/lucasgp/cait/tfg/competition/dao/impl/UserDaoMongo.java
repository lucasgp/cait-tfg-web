package es.lucasgp.cait.tfg.competition.dao.impl;

import es.lucasgp.cait.tfg.competition.dao.api.UserDao;
import es.lucasgp.cait.tfg.competition.dao.api.query.Query;
import es.lucasgp.cait.tfg.competition.model.SecurityUser;
import es.lucasgp.cait.tfg.competition.model.User;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoMongo extends BaseDaoMongo<User> implements UserDao {

    public UserDaoMongo() {
        super(User.class);
    }

    @Override
    public User create(SecurityUser user) {
        return getHelper().create(user, User.class);
    }

    @Override
    public List<SecurityUser> findSecurityUserByUsername(String username) {
        return getHelper().findByQuery(Query.getInstance().eq("username", username), SecurityUser.class, this.getEntityClass());
    }
}
