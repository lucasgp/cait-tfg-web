package es.lucasgp.cait.tfg.competition.service.impl;

import es.lucasgp.cait.tfg.competition.dao.api.UserDao;
import es.lucasgp.cait.tfg.competition.dao.api.query.Query;
import es.lucasgp.cait.tfg.competition.dto.PageRequest;
import es.lucasgp.cait.tfg.competition.dto.PageResult;
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
    public User create(final User user) {
        return super.create(user);
    }

    @Override
    public User update(final User user) {
        return super.update(user);
    }

    @Override
    public User findById(final String id) {
        return super.findById(id);
    }

    @Override
    public List<User> findByName(final String name) {
        return this.userDao.findByQuery(Query.getInstance().eq("name", name));
    }

    @Override
    public List<User> findAll() {
        return super.findAll();

    }

    @Override
    public PageResult<User> findAll(PageRequest pageRequest) {
        return super.findAll(pageRequest);
    }

}
