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
    private static final MongoDbEmbedRunner mongoRunner;

    static {
        mongoRunner = new MongoDbEmbedRunner();
        if (!mongoRunner.start()) {
            throw new RuntimeException("An error ocurred while starting embedded MongoDB for unit testing");
        }
        CONTEXT = new AnnotationConfigApplicationContext(ServicesSpringConfig.class);
    }

    public static ApplicationContext getContext() {
        return CONTEXT;
    }

    @BeforeClass
    public static void setUpBaseContext() {

    }

    @Before
    public void setUpBase() {

    }

    @After
    public void tearDownBase() {
        mongoRunner.dropDB();
    }

    @AfterClass
    public static void tearDownBaseContext() {
        mongoRunner.stop();
    }

}
