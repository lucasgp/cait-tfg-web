package es.lucasgp.cait.tfg.competition.dao.impl;

import es.lucasgp.cait.tfg.competition.dao.api.BaseDao;
import es.lucasgp.cait.tfg.competition.dao.api.query.Query;
import org.springframework.beans.factory.annotation.Autowired;

import es.lucasgp.cait.tfg.competition.dao.helper.MongoDaoHelper;
import es.lucasgp.cait.tfg.competition.dto.PageRequest;
import es.lucasgp.cait.tfg.competition.dto.PageResult;
import java.util.List;

public abstract class BaseDaoMongo<T> implements BaseDao<T, String> {

    private final Class<T> entityClass;

    @Autowired
    private MongoDaoHelper helper;

    public BaseDaoMongo(final Class<T> entityClass) {
        super();
        this.entityClass = entityClass;
    }

    public Class<T> getEntityClass() {
        return this.entityClass;
    }

    public MongoDaoHelper getHelper() {
        return this.helper;
    }

    public void setHelper(final MongoDaoHelper helper) {
        this.helper = helper;
    }

    @Override
    public T create(T entity) {
        return this.getHelper().create(entity);
    }

    @Override
    public T update(T entity) {
        return this.getHelper().update(entity);
    }

    @Override
    public void delete(String id) {
        this.getHelper().delete(id, this.getEntityClass());
    }

    @Override
    public T findById(String id) {
        return this.getHelper().findById(id, this.getEntityClass());
    }

    @Override
    public List<T> findByQuery(Query query) {
        return this.getHelper().findByQuery(query, this.getEntityClass());
    }

    @Override
    public PageResult<T> findByQuery(Query query, PageRequest pageRequest) {
        return this.getHelper().findByQuery(query, this.getEntityClass(), pageRequest);
    }

    @Override
    public List<T> findAll() {
        return this.getHelper().findAll(this.getEntityClass());
    }

    @Override
    public PageResult<T> findAll(PageRequest pageRequest) {
        return this.getHelper().findAll(this.getEntityClass(), pageRequest);
    }

}
