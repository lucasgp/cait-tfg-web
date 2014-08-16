package es.lucasgp.cait.tfg.competition.service.impl;

import es.lucasgp.cait.tfg.competition.model.Comment;
import es.lucasgp.cait.tfg.competition.model.Competition;
import es.lucasgp.cait.tfg.competition.service.api.CompetitionService;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;

public class CompetitionServiceImplTest extends BaseMongoDbSpringTest {

    private static final ApplicationContext CONTEXT = getContext();

    private CompetitionService service;

    public CompetitionServiceImplTest() {
    }

    @Before
    public void setUp() {
        service = CONTEXT.getBean(CompetitionServiceImpl.class);
    }

    @Test
    public void testAddComment() {
        Competition entityCreated = service.create(new Competition());
        Competition compWithComment = service.addComment(entityCreated.getId(), new Comment());
        assertNotNull(compWithComment);
        assertNotNull(compWithComment.getComments());
        assertEquals(1, compWithComment.getComments().size());
    }

}
