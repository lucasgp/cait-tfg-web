package es.lucasgp.cait.tfg.competition.service.api;

import es.lucasgp.cait.tfg.competition.model.UserRole;

public interface UserRoleService extends BaseService<UserRole, String> {

    UserRole findByUserId(String userId);

}
