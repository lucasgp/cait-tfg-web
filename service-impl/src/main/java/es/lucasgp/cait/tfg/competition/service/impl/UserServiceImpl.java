package es.lucasgp.cait.tfg.competition.service.impl;

import es.lucasgp.cait.tfg.competition.dao.api.UserDao;
import es.lucasgp.cait.tfg.competition.dao.api.query.Query;
import es.lucasgp.cait.tfg.competition.model.SecurityUser;
import es.lucasgp.cait.tfg.competition.model.User;
import es.lucasgp.cait.tfg.competition.service.api.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends BaseServiceImpl<User, String> implements UserService {

    private final UserDao userDao;

    @Autowired
    public UserServiceImpl(UserDao userDao) {
        super(userDao);
        this.userDao = userDao;
    }

    @Override
    public User create(final SecurityUser user) {
        return this.userDao.create(user);
    }

    @Override
    public List<User> findByUsername(final String name) {
        return this.userDao.findByQuery(Query.getInstance().eq("username", name));
    }

    @Override
    public List<SecurityUser> findSecurityUserByUsername(String username) {
        return this.userDao.findSecurityUserByUsername(username);
    }
}
