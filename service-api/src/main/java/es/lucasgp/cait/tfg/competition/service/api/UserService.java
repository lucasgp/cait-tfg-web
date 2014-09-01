package es.lucasgp.cait.tfg.competition.service.api;

import es.lucasgp.cait.tfg.competition.model.SecurityUser;
import es.lucasgp.cait.tfg.competition.model.User;
import java.util.List;

public interface UserService extends BaseService<User, String> {

    User create(final SecurityUser user);

    List<User> findByUsername(final String name);

    List<SecurityUser> findSecurityUserByUsername(String username);
}
