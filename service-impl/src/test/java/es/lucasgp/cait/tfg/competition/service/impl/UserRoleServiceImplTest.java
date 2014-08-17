package es.lucasgp.cait.tfg.competition.service.impl;

import es.lucasgp.cait.tfg.competition.model.Comment;
import es.lucasgp.cait.tfg.competition.model.Competition;
import es.lucasgp.cait.tfg.competition.model.Participant;
import es.lucasgp.cait.tfg.competition.model.RoleType;
import es.lucasgp.cait.tfg.competition.model.SecurityUser;
import es.lucasgp.cait.tfg.competition.model.User;
import es.lucasgp.cait.tfg.competition.model.UserRole;
import es.lucasgp.cait.tfg.competition.service.api.CompetitionService;
import es.lucasgp.cait.tfg.competition.service.api.RoleTypeService;
import es.lucasgp.cait.tfg.competition.service.api.UserRoleService;
import es.lucasgp.cait.tfg.competition.service.api.UserService;
import java.util.Arrays;
import java.util.List;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.springframework.context.ApplicationContext;

public class UserRoleServiceImplTest extends BaseMongoDbSpringTest {

    private static final ApplicationContext CONTEXT = getContext();

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    private RoleTypeService roleTypeService;
    private UserRoleService service;
    private UserService userService;

    public UserRoleServiceImplTest() {
    }

    @Before
    public void setUp() {

        roleTypeService = CONTEXT.getBean(RoleTypeService.class);
        service = CONTEXT.getBean(UserRoleServiceImpl.class);
        userService = CONTEXT.getBean(UserService.class);

    }

    @Test
    public void testFindByUserId() {

        User user = new User();
        user.setUsername("test");
        user = userService.create(user);

        RoleType roleType = new RoleType();
        roleType.setName("test");
        roleType = roleTypeService.create(roleType);

        UserRole entity = new UserRole();
        entity.setUserId(user.getId());
        entity.setRoleTypesId(Arrays.asList(roleType.getId()));
        UserRole entityCreated = service.create(entity);

        UserRole entityFound = service.findByUserId(user.getId());

        assertEquals(entityCreated.getId(), entityFound.getId());
    }

    @Test
    public void testFindByUserIdWrongId() {

        User user = new User();
        user.setUsername("test");
        user = userService.create(user);

        RoleType roleType = new RoleType();
        roleType.setName("test");
        roleType = roleTypeService.create(roleType);

        UserRole entity = new UserRole();
        entity.setUserId(user.getId());
        entity.setRoleTypesId(Arrays.asList(roleType.getId()));
        UserRole entityCreated = service.create(entity);

        UserRole entityFound = service.findByUserId("noExists");

        assertNull(entityFound);
    }
}
