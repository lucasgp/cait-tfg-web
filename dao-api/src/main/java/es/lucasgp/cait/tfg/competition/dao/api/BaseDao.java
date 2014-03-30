package es.lucasgp.cait.tfg.competition.dao.api;

import es.lucasgp.cait.tfg.competition.dao.api.query.Query;
import es.lucasgp.cait.tfg.competition.dto.PageRequest;
import es.lucasgp.cait.tfg.competition.dto.PageResult;
import java.util.List;

public interface BaseDao<T, ID> {

    T create(T entity);

    T update(T entity);

    T findById(ID id);

    List<T> findByQuery(Query query);

    PageResult<T> findByQuery(Query query, PageRequest pageRequest);

    List<T> findAll();

    PageResult<T> findAll(PageRequest pageRequest);

}
