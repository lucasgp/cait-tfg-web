package es.lucasgp.cait.tfg.competition.service.api;

import es.lucasgp.cait.tfg.competition.dto.PageRequest;
import es.lucasgp.cait.tfg.competition.dto.PageResult;
import java.util.List;
import java.util.Map;

public interface BaseService<T, ID> {

    T create(T entity);

    T update(T entity);

    void delete(ID id);

    T findById(ID id);

    List<T> findAll();

    List<T> findAll(Map<String, String> parameters);

    PageResult<T> findAll(PageRequest pageRequest);

    PageResult<T> findAll(PageRequest pageRequest, Map<String, String> parameters);

}
