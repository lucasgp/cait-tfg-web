package es.lucasgp.cait.tfg.competition.controller;

import es.lucasgp.cait.tfg.competition.dto.PageResult;
import es.lucasgp.cait.tfg.competition.model.User;
import es.lucasgp.cait.tfg.competition.security.annotation.AllowAdmin;
import es.lucasgp.cait.tfg.competition.security.annotation.AllowAll;
import es.lucasgp.cait.tfg.competition.service.api.UserService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController extends BaseController<User, String, UserService> {

    @Autowired
    public UserController(UserService userService) {
        super(userService);
    }

    @AllowAdmin
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public User create(@RequestBody @Valid final User user) {
        return super.create(user);
    }

    @AllowAdmin
    @RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public User update(@RequestBody @Valid final User user) {
        return super.update(user);
    }

    @AllowAll
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @Override
    public User findById(@PathVariable("id") final String id) {
        return super.findById(id);
    }

    @AllowAll
    @RequestMapping(method = RequestMethod.GET)
    @Override
    public List<User> findAll() {
        return super.findAll();

    }

    @AllowAll
    @RequestMapping(value = "/{page}/{size}", method = RequestMethod.GET)
    public PageResult<User> findAll(
        @PathVariable("page") Integer page,
        @PathVariable("size") Integer size
    ) {
        return super.findAll(page, size);
    }

    @AllowAll
    @RequestMapping(value = "/{page}/{size}/{sortProperty}/{sortOrder}", method = RequestMethod.GET)
    public PageResult<User> findAll(
        @PathVariable("page") Integer page,
        @PathVariable("size") Integer size,
        @PathVariable("sortProperty") String sortProperty,
        @PathVariable("sortOrder") String sortOrder
    ) {
        return super.findAll(page, size, sortProperty, sortOrder);
    }
}
