package es.lucasgp.cait.tfg.competition.controller;

import es.lucasgp.cait.tfg.competition.exceptions.WrongIdException;
import es.lucasgp.cait.tfg.competition.model.RoleType;
import es.lucasgp.cait.tfg.competition.service.api.RoleTypeService;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.Size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/role_types", produces = MediaType.APPLICATION_JSON_VALUE)
public class RoleTypeController extends BaseController<RoleType, String, RoleTypeService> {

    @Autowired
    public RoleTypeController(RoleTypeService roleTypeService) {
        super(roleTypeService);
    }

    @PreAuthorize("isFullyAuthenticated() and hasRole('ADMIN')")
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public RoleType create(@RequestBody @Valid final RoleType roleType) {
        return super.create(roleType);
    }

    @PreAuthorize("isFullyAuthenticated() and hasRole('ADMIN')")
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public RoleType update(@PathVariable("id") @Size(min = 1) final String id, @RequestBody @Valid final RoleType roleType) {
        if (!id.equalsIgnoreCase(roleType.getId())) {
            throw new WrongIdException();
        }
        return super.update(id, roleType);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @Override
    public RoleType findById(@PathVariable("id") @Size(min = 1) final String id) {
        return super.findById(id);
    }

    @RequestMapping(method = RequestMethod.GET)
    @Override
    public List<RoleType> findAll() {
        return super.findAll();
    }
}
