package es.lucasgp.cait.tfg.competition.service.impl;

import es.lucasgp.cait.tfg.competition.model.BaseEntity;
import es.lucasgp.cait.tfg.competition.service.api.BaseService;
import es.lucasgp.cait.tfg.competition.service.api.BaseServiceTest;
import org.junit.After;
import org.junit.AfterClass;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

public abstract class BaseServiceImplTest<T extends BaseEntity> extends BaseServiceTest<T> {

    public BaseServiceImplTest(BaseService<T, String> baseService, T entity) {
        super(baseService, entity);
    }

    @BeforeClass
    public static void setUpClass() {
    }

    @AfterClass
    public static void tearDownClass() {
    }

    @Before
    public void setUp() {
    }

    @After
    public void tearDown() {
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    // @Test
    // public void hello() {}
}
