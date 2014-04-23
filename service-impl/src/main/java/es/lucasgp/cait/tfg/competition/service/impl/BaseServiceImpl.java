package es.lucasgp.cait.tfg.competition.service.impl;

import es.lucasgp.cait.tfg.competition.dao.api.BaseDao;
import es.lucasgp.cait.tfg.competition.service.helper.QueryHelper;
import es.lucasgp.cait.tfg.competition.dto.PageRequest;
import es.lucasgp.cait.tfg.competition.dto.PageResult;
import es.lucasgp.cait.tfg.competition.service.api.BaseService;
import java.util.List;
import java.util.Map;
import javax.validation.constraints.NotNull;

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
    public void delete(@NotNull ID id) {
        baseDao.delete(id);
    }

    @Override
    public T findById(@NotNull ID id) {
        return baseDao.findById(id);
    }

    @Override
    public List<T> findAll() {
        return this.baseDao.findAll();

    }

    @Override
    public List<T> findAll(Map<String, String> parameters) {
        return this.baseDao.findByQuery(QueryHelper.getInstance().toQuery(parameters));

    }

    @Override
    public PageResult<T> findAll(PageRequest pageRequest) {
        return this.baseDao.findAll(pageRequest);
    }

    @Override
    public PageResult<T> findAll(PageRequest pageRequest, Map<String, String> parameters) {
        return this.baseDao.findByQuery(QueryHelper.getInstance().toQuery(parameters), pageRequest);
    }

}
