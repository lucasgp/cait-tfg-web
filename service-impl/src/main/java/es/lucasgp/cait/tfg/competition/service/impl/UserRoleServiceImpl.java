package es.lucasgp.cait.tfg.competition.service.impl;

import es.lucasgp.cait.tfg.competition.dao.api.UserRoleDao;
import es.lucasgp.cait.tfg.competition.dao.api.query.Query;
import es.lucasgp.cait.tfg.competition.model.UserRole;
import es.lucasgp.cait.tfg.competition.service.api.UserRoleService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRoleServiceImpl implements UserRoleService {

    private final UserRoleDao userRoleDao;

    @Autowired
    public UserRoleServiceImpl(UserRoleDao userRoleDao) {
        this.userRoleDao = userRoleDao;
    }

    @Override
    public void create(final UserRole userRole) {
        userRoleDao.create(userRole);
    }

    @Override
    public void delete(final String id) {
        this.userRoleDao.delete(id);
    }

    @Override
    public List<UserRole> findByUserId(final String id) {
        return userRoleDao.findByQuery(Query.getInstance().eq("userId", id));
    }
}
