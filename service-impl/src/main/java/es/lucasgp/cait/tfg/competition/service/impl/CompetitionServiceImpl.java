package es.lucasgp.cait.tfg.competition.service.impl;

import es.lucasgp.cait.tfg.competition.dao.api.CompetitionDao;
import es.lucasgp.cait.tfg.competition.dto.PageRequest;
import es.lucasgp.cait.tfg.competition.dto.PageResult;
import es.lucasgp.cait.tfg.competition.model.Competition;
import es.lucasgp.cait.tfg.competition.service.api.CompetitionService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompetitionServiceImpl extends BaseServiceImpl<Competition, String> implements CompetitionService {

    private final CompetitionDao competitionDao;

    @Autowired
    public CompetitionServiceImpl(CompetitionDao competitionDao) {
        super(competitionDao);
        this.competitionDao = competitionDao;
    }

    @Override
    public Competition create(final Competition competition) {
        return super.create(competition);
    }

    @Override
    public Competition update(final Competition competition) {
        return super.update(competition);
    }

    @Override
    public Competition findById(final String id) {
        return super.findById(id);
    }

    @Override
    public List<Competition> findAll() {
        return super.findAll();

    }

    @Override
    public PageResult<Competition> findAll(PageRequest pageRequest) {
        return super.findAll(pageRequest);
    }

}
