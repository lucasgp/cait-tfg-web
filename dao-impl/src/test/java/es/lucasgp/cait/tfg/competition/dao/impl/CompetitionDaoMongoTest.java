package es.lucasgp.cait.tfg.competition.dao.impl;

import es.lucasgp.cait.tfg.competition.dao.api.query.Query;
import java.util.List;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import es.lucasgp.cait.tfg.competition.dao.conf.TestConfig;
import es.lucasgp.cait.tfg.competition.model.Competition;
import java.util.Date;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = TestConfig.class)
// @TestExecutionListeners(LogTestExecutionListener.class)
public class CompetitionDaoMongoTest {

    private static final Logger LOGGER = LoggerFactory.getLogger(CompetitionDaoMongoTest.class);

    @Autowired
    private CompetitionDaoMongo dao;

    @BeforeClass
    public static void setUpBeforeClass() throws Exception {
    }

    @AfterClass
    public static void tearDownAfterClass() throws Exception {
    }

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void testFindAll() {

        final List<Competition> result = this.dao.findAll();

        LOGGER.debug(result.toString());

        Assert.assertNotNull(result);
        Assert.assertTrue(result.size() > 0);
    }

    @Test
    public void testFindByQuery() {

        Query query = Query.getInstance().like("name", "PUT").gt("startDate", new Date());

        final List<Competition> result = this.dao.findByQuery(query);

        LOGGER.debug(result.toString());

        Assert.assertNotNull(result);
        Assert.assertTrue(result.size() > 0);
    }

}
