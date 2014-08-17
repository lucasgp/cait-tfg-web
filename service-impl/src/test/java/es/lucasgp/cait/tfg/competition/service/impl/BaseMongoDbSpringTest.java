package es.lucasgp.cait.tfg.competition.service.impl;

import es.lucasgp.cait.tfg.competition.service.conf.ServicesSpringConfig;
import es.lucasgp.cait.tfg.competition.service.helper.MongoDbEmbedRunner;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public abstract class BaseMongoDbSpringTest {

    private static final ApplicationContext CONTEXT;

    static {
        CONTEXT = new AnnotationConfigApplicationContext(ServicesSpringConfig.class);
    }

    public static ApplicationContext getContext() {
        return CONTEXT;
    }

    @BeforeClass
    public static void setUpBaseContext() {
        MongoDbEmbedRunner.init();
    }

    @Before
    public void setUpBase() {
        MongoDbEmbedRunner.createDB();
    }

    @After
    public void tearDownBase() {
        MongoDbEmbedRunner.dropDB();
    }

    @AfterClass
    public static void tearDownBaseContext() {

    }

}
