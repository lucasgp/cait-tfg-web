package es.lucasgp.cait.tfg.competition.service.api;

import es.lucasgp.cait.tfg.competition.dto.PageRequest;
import es.lucasgp.cait.tfg.competition.dto.PageResult;
import java.util.List;

public interface BaseService<T, ID> {

    T create(T entity);

    T update(T entity);

    T findById(ID id);

    List<T> findAll();

    PageResult<T> findAll(PageRequest pageRequest);

}
