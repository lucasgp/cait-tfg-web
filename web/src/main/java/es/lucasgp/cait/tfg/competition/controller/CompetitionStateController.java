package es.lucasgp.cait.tfg.competition.controller;

import es.lucasgp.cait.tfg.competition.exceptions.WrongIdException;
import es.lucasgp.cait.tfg.competition.model.CompetitionState;
import es.lucasgp.cait.tfg.competition.service.api.CompetitionStateService;
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
@RequestMapping(value = "/competition_states", produces = MediaType.APPLICATION_JSON_VALUE)
public class CompetitionStateController extends BaseController<CompetitionState, String, CompetitionStateService> {

    @Autowired
    public CompetitionStateController(CompetitionStateService competitionStateService) {
        super(competitionStateService);
    }

    @PreAuthorize("isFullyAuthenticated() and hasRole('ADMIN')")
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public CompetitionState create(@RequestBody @Valid final CompetitionState competitionState) {
        return super.create(competitionState);
    }

    @PreAuthorize("isFullyAuthenticated() and hasRole('ADMIN')")
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public CompetitionState update(@PathVariable("id") @Size(min = 1) final String id, @RequestBody @Valid final CompetitionState competitionState) {
        if (!id.equalsIgnoreCase(competitionState.getId())) {
            throw new WrongIdException();
        }
        return super.update(id, competitionState);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @Override
    public CompetitionState findById(@PathVariable("id") @Size(min = 1) final String id) {
        return super.findById(id);
    }

    @RequestMapping(method = RequestMethod.GET)
    @Override
    public List<CompetitionState> findAll() {
        return super.findAll();
    }
}
