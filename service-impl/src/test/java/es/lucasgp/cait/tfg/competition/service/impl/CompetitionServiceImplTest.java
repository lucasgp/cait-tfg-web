package es.lucasgp.cait.tfg.competition.service.impl;

import es.lucasgp.cait.tfg.competition.model.Comment;
import es.lucasgp.cait.tfg.competition.model.Competition;
import es.lucasgp.cait.tfg.competition.model.Participant;
import es.lucasgp.cait.tfg.competition.model.User;
import es.lucasgp.cait.tfg.competition.service.api.CompetitionService;
import es.lucasgp.cait.tfg.competition.service.api.UserService;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.springframework.context.ApplicationContext;

public class CompetitionServiceImplTest extends BaseMongoDbSpringTest {

    private static final ApplicationContext CONTEXT = getContext();

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    private CompetitionService service;
    private UserService userService;

    User user = null;

    public CompetitionServiceImplTest() {
    }

    @Before
    public void setUp() {

        service = CONTEXT.getBean(CompetitionServiceImpl.class);
        userService = CONTEXT.getBean(UserService.class);

        User user = new User();
        user.setUsername("test");
        this.user = userService.create(user);
    }

    @Test
    public void testAddCommentEmpty() {

        thrown.expect(IllegalArgumentException.class);

        Competition entityCreated = service.create(new Competition());
        service.addComment(entityCreated.getId(), new Comment());

        fail("Adding comment without an user ID should throw an exception");
    }

    @Test
    public void testAddComment() {

        Competition entityCreated = service.create(new Competition());
        Comment comment = new Comment();
        comment.setUserId(this.user.getId());
        Competition compWithComment = service.addComment(entityCreated.getId(), comment);
        assertNotNull(compWithComment);
        assertNotNull(compWithComment.getComments());
        assertEquals(1, compWithComment.getComments().size());
    }

    @Test
    public void testDeleteComment() {

        Competition entityCreated = service.create(new Competition());
        Comment comment = new Comment();
        comment.setUserId(this.user.getId());
        Competition compWithComment = service.addComment(entityCreated.getId(), comment);
        service.deleteComment(entityCreated.getId(), comment.getId());

        Competition compWithoutComment = service.findById(compWithComment.getId());

        assertNotNull(compWithoutComment);
        assertNotNull(compWithoutComment.getComments());
        assertEquals(0, compWithoutComment.getComments().size());
    }

    @Test
    public void testDeleteCommentNonExistent() {

        Competition entityCreated = service.create(new Competition());
        service.deleteComment(entityCreated.getId(), "1");

        Competition compWithoutComment = service.findById(entityCreated.getId());

        assertNotNull(compWithoutComment);
        assertNull(compWithoutComment.getComments());
    }

    @Test
    public void testAddParticipantEmpty() {

        thrown.expect(IllegalArgumentException.class);

        Competition entityCreated = service.create(new Competition());
        service.addParticipant(entityCreated.getId(), new Participant());

        fail("Adding participants without user ID should thow an exception");
    }

    @Test
    public void testAddParticipant() {

        Competition entityCreated = service.create(new Competition());
        Participant participant = new Participant();
        participant.setUserId(user.getId());
        Competition compWithParticipant = service.addParticipant(entityCreated.getId(), participant);

        assertNotNull(compWithParticipant);
        assertNotNull(compWithParticipant.getParticipants());
        assertEquals(1, compWithParticipant.getParticipants().size());
    }

    @Test
    public void testAddParticipantTwice() {

        Competition entityCreated = service.create(new Competition());
        Participant participant = new Participant();
        participant.setUserId(user.getId());
        service.addParticipant(entityCreated.getId(), participant);
        Competition compWithParticipant = service.addParticipant(entityCreated.getId(), participant);

        assertNotNull(compWithParticipant);
        assertNotNull(compWithParticipant.getParticipants());
        assertEquals(1, compWithParticipant.getParticipants().size());
    }

    @Test
    public void testUpdateParticipant() {
        Competition entityCreated = service.create(new Competition());
        Participant participant = new Participant();
        participant.setUserId(user.getId());
        Competition compWithParticipant = service.addParticipant(entityCreated.getId(), participant);

        int expectedScore = 111;

        participant.setScore(expectedScore);

        service.updateParticipant(compWithParticipant.getId(), participant);

        Competition compWithParticipantUpdated = service.findById(compWithParticipant.getId());

        assertNotNull(compWithParticipantUpdated);
        assertNotNull(compWithParticipantUpdated.getParticipants());
        assertEquals(1, compWithParticipantUpdated.getParticipants().size());
        assertEquals(expectedScore, compWithParticipantUpdated.getParticipants().get(0).getScore());

    }

    @Test
    public void testDeleteParticipant() {

        Competition entityCreated = service.create(new Competition());
        Participant participant = new Participant();
        participant.setUserId(user.getId());
        Competition compWithParticipant = service.addParticipant(entityCreated.getId(), participant);
        service.deleteParticipant(compWithParticipant.getId(), participant.getUserId());

        Competition compWithoutParticipant = service.findById(compWithParticipant.getId());

        assertNotNull(compWithoutParticipant);
        assertNotNull(compWithoutParticipant.getParticipants());
        assertEquals(0, compWithoutParticipant.getParticipants().size());
    }

    @Test
    public void testDeleteParticipantNonExistent() {

        Competition entityCreated = service.create(new Competition());
        service.deleteParticipant(entityCreated.getId(), user.getId());

        Competition compWithoutParticipant = service.findById(entityCreated.getId());

        assertNotNull(compWithoutParticipant);
        assertNull(compWithoutParticipant.getParticipants());
    }

}
