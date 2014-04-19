package es.lucasgp.cait.tfg.competition.controller;

import es.lucasgp.cait.tfg.competition.dto.PageRequest;
import es.lucasgp.cait.tfg.competition.dto.PageResult;
import es.lucasgp.cait.tfg.competition.dto.Sort;
import es.lucasgp.cait.tfg.competition.service.api.BaseService;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.util.MultiValueMap;

public abstract class BaseController<T, ID, S extends BaseService<T, ID>> {

    private final S service;

    public BaseController(S service) {
        this.service = service;
    }

    public S getService() {
        return service;
    }

    public boolean test() {
        return true;
    }

    public T create(T entity) {
        return getService().create(entity);
    }

    public T update(T entity) {
        return getService().update(entity);
    }

    public void delete(ID id) {
        getService().delete(id);
    }

    public T findById(ID id) {
        return getService().findById(id);
    }

    public List<T> findAll() {
        return getService().findAll();
    }

    public List<T> findAll(MultiValueMap parameters) {
        return getService().findAll(extractParameters(parameters));
    }

    public PageResult<T> findAll(int page, int size, MultiValueMap parameters) {
        return findAll(page, size, null, parameters);
    }

    public PageResult<T> findAll(int page, int size, String sortProperty, MultiValueMap parameters) {
        return findAll(page, size, sortProperty, (String) null, parameters);
    }

    public PageResult<T> findAll(int page, int size, String sortProperty, String sortOrder, MultiValueMap parameters) {
        return findAll(page, size, sortProperty, sortOrder != null ? Sort.Order.valueOf(sortOrder) : null, parameters);
    }

    public PageResult<T> findAll(int page, int size, String sortProperty, Sort.Order sortOrder, MultiValueMap parameters) {

        PageRequest pageRequest = new PageRequest(page, size);

        if (sortProperty != null) {

            Sort sort = new Sort(sortProperty);

            if (sortOrder != null) {
                sort.setOrder(sortOrder);
            }

            pageRequest.getSorting().add(sort);
        }

        return getService().findAll(pageRequest, extractParameters(parameters));
    }

    private Map<String, String> extractParameters(MultiValueMap<String, String> parameters) {
        return parameters.entrySet().stream().collect(Collectors.toMap(entry -> entry.getKey(), entry -> entry.getValue().get(0)));
    }

}
