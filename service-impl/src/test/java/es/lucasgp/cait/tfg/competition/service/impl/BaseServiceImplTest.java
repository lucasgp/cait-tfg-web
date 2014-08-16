package es.lucasgp.cait.tfg.competition.service.impl;

import es.lucasgp.cait.tfg.competition.dto.PageRequest;
import es.lucasgp.cait.tfg.competition.dto.PageResult;
import es.lucasgp.cait.tfg.competition.model.BaseEntity;
import es.lucasgp.cait.tfg.competition.model.Competition;
import es.lucasgp.cait.tfg.competition.model.CompetitionState;
import es.lucasgp.cait.tfg.competition.model.CompetitionType;
import es.lucasgp.cait.tfg.competition.model.RoleType;
import es.lucasgp.cait.tfg.competition.model.Tracking;
import es.lucasgp.cait.tfg.competition.model.User;
import es.lucasgp.cait.tfg.competition.model.UserRole;
import es.lucasgp.cait.tfg.competition.service.api.BaseService;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import static org.junit.Assert.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;
import org.springframework.context.ApplicationContext;

@RunWith(Parameterized.class)
public class BaseServiceImplTest<T extends BaseEntity> extends BaseMongoDbSpringTest {

    private static final ApplicationContext CONTEXT = getContext();

    private final BaseService<T, String> baseService;
    private final T entity;

    public BaseServiceImplTest(BaseService<T, String> baseService, T entity) {
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
        int expectedVersion = entityCreated.getVersion();
        T entityUpdated = baseService.update(entityCreated);
        assertEquals(expectedVersion + 1, entityUpdated.getVersion());
    }

    @Test
    public void testDelete() {
        T entityCreated = baseService.create(entity);
        baseService.delete(entityCreated.getId());
        assertNull(baseService.findById(entityCreated.getId()));
    }

    @Test
    public void testFindById() {
        T entityCreated = baseService.create(entity);
        T entityFound = baseService.findById(entityCreated.getId());
        assertEquals(entityCreated.getId(), entityFound.getId());
    }

    @Test
    public void testFindAllWithOneEntity() {
        T entityCreated = baseService.create(entity);
        List<T> entitiesFound = baseService.findAll();
        assertNotNull(entitiesFound);
        assertEquals(1, entitiesFound.size());
        assertEquals(entityCreated.getId(), entitiesFound.get(0).getId());
    }

    @Test
    public void testFindAllPaged() {

        for (int i = 0; i < 10; i++) {
            entity.setId(null);
            entity.setVersion(0);
            baseService.create(entity);
        }

        PageRequest pageRequest = new PageRequest();
        pageRequest.setPage(0);
        pageRequest.setSize(5);

        PageResult<T> page = baseService.findAll(pageRequest);
        List<T> totalEntities = baseService.findAll();

        assertNotNull(page);
        assertEquals(totalEntities.size(), page.getTotalElements());
        assertTrue(pageRequest.getSize() >= page.getElements().size());
        assertEquals(pageRequest.getPage(), page.getPage());
    }

    @Test
    public void testFindAllPagedEmptyPage() {

        for (int i = 0; i < 10; i++) {
            entity.setId(null);
            entity.setVersion(0);
            baseService.create(entity);
        }

        PageRequest pageRequest = new PageRequest();
        pageRequest.setPage(2);
        pageRequest.setSize(5);

        PageResult<T> page = baseService.findAll(pageRequest);
        List<T> totalEntities = baseService.findAll();

        assertNotNull(page);
        assertEquals(totalEntities.size(), page.getTotalElements());
        assertEquals(0, page.getElements().size());
        assertEquals(pageRequest.getPage(), page.getPage());
    }

    @Test
    public void testFindAllPagedWithParams() {

        T entityCreated = baseService.create(entity);

        for (int i = 0; i < 10; i++) {
            entity.setId(null);
            entity.setVersion(0);
            baseService.create(entity);
        }

        PageRequest pageRequest = new PageRequest();
        pageRequest.setPage(0);
        pageRequest.setSize(5);

        Map<String, String> params = new HashMap();
        params.put("id-eq", entityCreated.getId());

        PageResult<T> page = baseService.findAll(pageRequest, params);

        assertNotNull(page);
        assertEquals(1, page.getTotalElements());
        assertEquals(1, page.getElements().size());
        assertEquals(pageRequest.getPage(), page.getPage());
        assertEquals(entityCreated.getId(), page.getElements().get(0).getId());
    }

    @Parameters(name = "{index}: {0}, {1}")
    public static Collection<Object[]> data() {
        return Arrays.<Object[]>asList(new Object[][]{
            /*
             * Tests using base service and an empty entity.
             */
            {CONTEXT.getBean(CompetitionServiceImpl.class), new Competition()},
            {CONTEXT.getBean(CompetitionStateServiceImpl.class), new CompetitionState()},
            {CONTEXT.getBean(CompetitionTypeServiceImpl.class), new CompetitionType()},
            {CONTEXT.getBean(RoleTypeServiceImpl.class), new RoleType()},
            {CONTEXT.getBean(TrackingServiceImpl.class), new Tracking()},
            {CONTEXT.getBean(UserRoleServiceImpl.class), new UserRole()},
            {CONTEXT.getBean(UserServiceImpl.class), new User()}
        });
    }
}
