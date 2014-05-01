package es.lucasgp.cait.tfg.competition.controller;

import es.lucasgp.cait.tfg.competition.exceptions.WrongIdException;
import es.lucasgp.cait.tfg.competition.model.UserRole;
import es.lucasgp.cait.tfg.competition.service.api.UserRoleService;
import javax.validation.Valid;
import javax.validation.constraints.Size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user_roles", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserRoleController extends BaseController<UserRole, String, UserRoleService> {

    @Autowired
    public UserRoleController(UserRoleService userRoleService) {
        super(userRoleService);
    }

    @PreAuthorize("isFullyAuthenticated() and hasRole('ADMIN')")
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public UserRole create(@RequestBody @Valid final UserRole userRole) {
        return super.create(userRole);
    }

    @PreAuthorize("isFullyAuthenticated() and hasRole('ADMIN')")
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public UserRole update(@PathVariable("id") @Size(min = 1) final String id, @RequestBody @Valid final UserRole userRole) {
        if (!id.equalsIgnoreCase(userRole.getId())) {
            throw new WrongIdException();
        }
        return super.update(id, userRole);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @Override
    public UserRole findById(@PathVariable("id") @Size(min = 1) final String id) {
        return super.findById(id);
    }

    @RequestMapping(method = RequestMethod.GET)
    public UserRole findByUserId(@RequestParam(value = "userId", required = true) @Size(min = 1) final String userId) {
        return getService().findByUserId(userId);
    }
}
