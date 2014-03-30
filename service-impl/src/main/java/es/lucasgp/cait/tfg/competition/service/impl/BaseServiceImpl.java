package es.lucasgp.cait.tfg.competition.service.impl;

import es.lucasgp.cait.tfg.competition.dao.api.BaseDao;
import es.lucasgp.cait.tfg.competition.dto.PageRequest;
import es.lucasgp.cait.tfg.competition.dto.PageResult;
import es.lucasgp.cait.tfg.competition.service.api.BaseService;
import java.util.List;

public abstract class BaseServiceImpl<T, ID> implements BaseService<T, ID> {

    private final BaseDao<T, ID> baseDao;

    public BaseServiceImpl(BaseDao<T, ID> baseDao) {
        this.baseDao = baseDao;
    }

    @Override
    public T create(T entity) {
        return baseDao.create(entity);
    }

    @Override
    public T update(T entity) {
        return baseDao.update(entity);
    }

    @Override
    public T findById(ID id) {
        return baseDao.findById(id);
    }

    @Override
    public List<T> findAll() {
        return this.baseDao.findAll();

    }

    @Override
    public PageResult<T> findAll(PageRequest pageRequest) {
        return this.baseDao.findAll(pageRequest);
    }

}
