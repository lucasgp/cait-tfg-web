package es.lucasgp.cait.tfg.competition.dao.helper;

import es.lucasgp.cait.tfg.competition.dao.api.query.Query;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import es.lucasgp.cait.tfg.competition.dto.PageRequest;
import es.lucasgp.cait.tfg.competition.dto.PageResult;
import es.lucasgp.cait.tfg.competition.dto.Sort.Order;

@Component
public class MongoDaoHelper {

    @Autowired
    private MongoTemplate mongoTemplate;

    public <T> T create(T entity) {
        this.mongoTemplate.insert(entity);
        return entity;
    }

    public <T> T update(T entity) {
        this.mongoTemplate.save(entity);
        return entity;
    }

    public <T> void delete(String id, final Class<T> entityClass) {
        this.mongoTemplate.remove(findById(id, entityClass));
    }

    public <T> T findById(String id, final Class<T> entityClass) {
        return this.mongoTemplate.findById(id, entityClass);
    }

    public <T> List<T> findByQuery(final Query query, final Class<T> entityClass) {
        return executeQuery(QueryConverter.toMongoQuery(query), entityClass);
    }

    public <T> PageResult<T> findByQuery(final Query query, final Class<T> entityClass, final PageRequest pageRequest) {
        return executeQuery(QueryConverter.toMongoQuery(query), entityClass, pageRequest);
    }

    public <T> List<T> findAll(final Class<T> entityClass) {
        return this.mongoTemplate.findAll(entityClass);
    }

    public <T> PageResult<T> findAll(final Class<T> entityClass, final PageRequest pageRequest) {
        return executeQuery(new org.springframework.data.mongodb.core.query.Query(), entityClass, pageRequest);
    }

    private <T> List<T> executeQuery(final org.springframework.data.mongodb.core.query.Query query, final Class<T> entityClass) {
        return this.mongoTemplate.find(query, entityClass);
    }

    private <T> PageResult<T> executeQuery(final org.springframework.data.mongodb.core.query.Query query, final Class<T> entityClass, final PageRequest pageRequest) {

        int page = 0;

        if (pageRequest != null) {
            page = pageRequest.getPage();
            query.with(this.getPageable(pageRequest));
        }

        List<T> elements = executeQuery(query, entityClass);
        long totalElements = this.mongoTemplate.count(query, entityClass);

        return new PageResult(elements, page, totalElements);
    }

    private org.springframework.data.domain.PageRequest getPageable(final PageRequest pageRequest) {
        return new org.springframework.data.domain.PageRequest(pageRequest.getPage(), pageRequest.getSize(), this
            .getSort(pageRequest));
    }

    private org.springframework.data.domain.Sort getSort(final PageRequest pageRequest) {

        org.springframework.data.domain.Sort sort = null;

        if (!pageRequest.getSorting().isEmpty()) {

            final List<org.springframework.data.domain.Sort.Order> orders = new ArrayList<>();

            pageRequest.getSorting().stream().forEach(
                propertySort -> orders.add(new org.springframework.data.domain.Sort.Order(MongoDaoHelper.this
                        .getDirection(propertySort.getOrder()), propertySort.getProperty())));

            sort = new org.springframework.data.domain.Sort(orders);
        }

        return sort;
    }

    private org.springframework.data.domain.Sort.Direction getDirection(final Order order) {

        switch (order) {
            case ASC:
                return org.springframework.data.domain.Sort.Direction.ASC;
            case DESC:
                return org.springframework.data.domain.Sort.Direction.DESC;
            default:
                throw new IllegalArgumentException("Wrong order type " + order);
        }

    }
}
