package es.lucasgp.cait.tfg.competition.controller;

import es.lucasgp.cait.tfg.competition.dto.PageResult;
import es.lucasgp.cait.tfg.competition.model.Competition;
import es.lucasgp.cait.tfg.competition.security.annotation.AllowAdmin;
import es.lucasgp.cait.tfg.competition.security.annotation.AllowAll;
import es.lucasgp.cait.tfg.competition.service.api.CompetitionService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/competitions", produces = MediaType.APPLICATION_JSON_VALUE)
public class CompetitionController extends BaseController<Competition, String, CompetitionService> {

    @Autowired
    public CompetitionController(CompetitionService competitionService) {
        super(competitionService);
    }

    @AllowAdmin
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public Competition create(@RequestBody @Valid final Competition competition) {
        return super.create(competition);
    }

    @AllowAdmin
    @RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public Competition update(@RequestBody @Valid final Competition competition) {
        return super.update(competition);
    }

    @AllowAll
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @Override
    public Competition findById(@PathVariable("id") final String id) {
        return super.findById(id);
    }

    @AllowAll
    @RequestMapping(method = RequestMethod.GET)
    @Override
    public List<Competition> findAll() {
        return super.findAll();

    }

    @AllowAll
    @RequestMapping(value = "/{page}/{size}", method = RequestMethod.GET)
    public PageResult<Competition> findAll(
        @PathVariable("page") Integer page,
        @PathVariable("size") Integer size
    ) {
        return super.findAll(page, size);
    }

    @AllowAll
    @RequestMapping(value = "/{page}/{size}/{sortProperty}/{sortOrder}", method = RequestMethod.GET)
    public PageResult<Competition> findAll(
        @PathVariable("page") Integer page,
        @PathVariable("size") Integer size,
        @PathVariable("sortProperty") String sortProperty,
        @PathVariable("sortOrder") String sortOrder
    ) {
        return super.findAll(page, size, sortProperty, sortOrder);
    }

    @AllowAll
    @RequestMapping(value = "/test", method = RequestMethod.GET)
    @Override
    public boolean test() {
        return super.test();
    }

}
