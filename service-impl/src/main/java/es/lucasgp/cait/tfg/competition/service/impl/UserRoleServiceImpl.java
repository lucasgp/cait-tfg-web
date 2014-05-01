package es.lucasgp.cait.tfg.competition.service.impl;

import es.lucasgp.cait.tfg.competition.dao.api.UserRoleDao;
import es.lucasgp.cait.tfg.competition.dao.api.query.Query;
import es.lucasgp.cait.tfg.competition.model.UserRole;
import es.lucasgp.cait.tfg.competition.service.api.UserRoleService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRoleServiceImpl extends BaseServiceImpl<UserRole, String> implements UserRoleService {

    private final UserRoleDao userRoleDao;

    @Autowired
    public UserRoleServiceImpl(UserRoleDao userRoleDao) {
        super(userRoleDao);
        this.userRoleDao = userRoleDao;
    }

    @Override
    public UserRole findByUserId(final String id) {
        List<UserRole> userRole = userRoleDao.findByQuery(Query.getInstance().eq("userId", id));
        return userRole.size() == 1 ? userRole.get(0) : null;
    }
}
