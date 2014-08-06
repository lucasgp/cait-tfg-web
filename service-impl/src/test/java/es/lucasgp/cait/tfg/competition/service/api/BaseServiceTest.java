package es.lucasgp.cait.tfg.competition.service.api;

import es.lucasgp.cait.tfg.competition.model.BaseEntity;
import es.lucasgp.cait.tfg.competition.service.api.BaseService;
import java.util.Collection;
import java.util.List;
import static org.junit.Assert.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

@RunWith(Parameterized.class)
public abstract class BaseServiceTest<T extends BaseEntity> {

    private final BaseService<T, String> baseService;
    private final T entity;

    public BaseServiceTest(BaseService<T, String> baseService, T entity) {
        this.baseService = baseService;
        this.entity = entity;
    }

    @Test
    public void testCreate() {
        T entityCreated = baseService.create(entity);
        assertEquals(entity, entityCreated);
    }

    @Test
    public void testUpdate() {
        T entityCreated = baseService.create(entity);
        T entityUpdated = baseService.update(entityCreated);
        assertEquals(entityUpdated.getVersion(), entityCreated.getVersion() + 1);
    }

    @Test
    public void testDelete() {
        T entityCreated = baseService.create(entity);
        baseService.delete(entityCreated.getId());
        assertNull(baseService.findById(entityCreated.getId()));
    }

    @Parameters
    public abstract Collection<Object[]> data();
}
