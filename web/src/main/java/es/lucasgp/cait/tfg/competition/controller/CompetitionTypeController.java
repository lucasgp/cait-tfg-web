package es.lucasgp.cait.tfg.competition.controller;

import es.lucasgp.cait.tfg.competition.exceptions.WrongIdException;
import es.lucasgp.cait.tfg.competition.model.CompetitionType;
import es.lucasgp.cait.tfg.competition.service.api.CompetitionTypeService;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.Size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/competition_types", produces = MediaType.APPLICATION_JSON_VALUE)
public class CompetitionTypeController extends BaseController<CompetitionType, String, CompetitionTypeService> {

    @Autowired
    public CompetitionTypeController(CompetitionTypeService competitionTypeService) {
        super(competitionTypeService);
    }

    @PreAuthorize("isFullyAuthenticated() and hasRole('ADMIN')")
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public CompetitionType create(@RequestBody @Valid final CompetitionType competitionType) {
        return super.create(competitionType);
    }

    @PreAuthorize("isFullyAuthenticated() and hasRole('ADMIN')")
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public CompetitionType update(@PathVariable("id") @Size(min = 1) final String id, @RequestBody @Valid final CompetitionType competitionType) {
        if (!id.equalsIgnoreCase(competitionType.getId())) {
            throw new WrongIdException();
        }
        return super.update(id, competitionType);
    }

    @PreAuthorize("isFullyAuthenticated() and hasRole('ADMIN')")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Override
    public void delete(@PathVariable("id") @Size(min = 1) final String id) {
        super.delete(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @Override
    public CompetitionType findById(@PathVariable("id") @Size(min = 1) final String id) {
        return super.findById(id);
    }

    @RequestMapping(method = RequestMethod.GET)
    @Override
    public List<CompetitionType> findAll() {
        return super.findAll();
    }
}
