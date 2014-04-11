package es.lucasgp.cait.tfg.competition.service.api;

import es.lucasgp.cait.tfg.competition.model.User;
import java.util.List;

public interface UserService extends BaseService<User, String> {

    List<User> findByName(final String name);
}
