package es.lucasgp.cait.tfg.competition.dao.api;

import es.lucasgp.cait.tfg.competition.model.SecurityUser;
import es.lucasgp.cait.tfg.competition.model.User;
import java.util.List;

public interface UserDao extends BaseDao<User, String> {

    User create(final SecurityUser user);

    List<SecurityUser> findSecurityUserByUsername(String username);
}
