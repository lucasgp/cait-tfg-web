package es.lucasgp.cait.tfg.competition.service.api;

import es.lucasgp.cait.tfg.competition.model.UserRole;
import java.util.List;

public interface UserRoleService {

    void create(UserRole userRole);

    void delete(String id);

    List<UserRole> findByUserId(String userId);

}
