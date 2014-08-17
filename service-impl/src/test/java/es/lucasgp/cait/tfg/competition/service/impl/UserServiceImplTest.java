package es.lucasgp.cait.tfg.competition.service.impl;

import es.lucasgp.cait.tfg.competition.model.Comment;
import es.lucasgp.cait.tfg.competition.model.Competition;
import es.lucasgp.cait.tfg.competition.model.Participant;
import es.lucasgp.cait.tfg.competition.model.SecurityUser;
import es.lucasgp.cait.tfg.competition.model.User;
import es.lucasgp.cait.tfg.competition.service.api.CompetitionService;
import es.lucasgp.cait.tfg.competition.service.api.UserService;
import java.util.List;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.springframework.context.ApplicationContext;

public class UserServiceImplTest extends BaseMongoDbSpringTest {

    private static final ApplicationContext CONTEXT = getContext();

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    private UserService service;

    public UserServiceImplTest() {
    }

    @Before
    public void setUp() {

        service = CONTEXT.getBean(UserServiceImpl.class);

    }

    @Test
    public void testCreate() {
        User user = new User();
        user.setUsername("test");
        User entityCreated = service.create(user);
        assertEquals(user, entityCreated);
    }

    @Test
    public void testCreateSecurityUser() {
        SecurityUser user = new SecurityUser();
        user.setUsername("test");
        User entityCreated = service.create(user);
        assertEquals(user.getId(), entityCreated.getId());
    }

    @Test
    public void testFindByUsername() {

        String username = "test";

        User user = new User();
        user.setUsername(username);
        User entityCreated = service.create(user);
        List<User> entitiesFound = service.findByUsername(username);

        assertNotNull(entitiesFound);
        assertEquals(1, entitiesFound.size());
        assertEquals(entityCreated.getId(), entitiesFound.get(0).getId());
    }

    @Test
    public void testFindSecurityUserByUsername() {

        String username = "test";

        SecurityUser user = new SecurityUser();
        user.setUsername(username);
        User entityCreated = service.create(user);
        List<SecurityUser> entitiesFound = service.findSecurityUserByUsername(username);

        assertNotNull(entitiesFound);
        assertEquals(1, entitiesFound.size());
        assertEquals(entityCreated.getId(), entitiesFound.get(0).getId());
    }

    @Test
    public void testFindSecurityUserByWrongUsername() {

        String username = "test";

        SecurityUser user = new SecurityUser();
        user.setUsername(username);
        User entityCreated = service.create(user);
        List<SecurityUser> entitiesFound = service.findSecurityUserByUsername("noExists");

        assertNotNull(entitiesFound);
        assertEquals(0, entitiesFound.size());
    }
}
