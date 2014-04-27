package es.lucasgp.cait.tfg.competition.service.impl;

import es.lucasgp.cait.tfg.competition.dao.api.CompetitionStateDao;
import es.lucasgp.cait.tfg.competition.model.CompetitionState;
import es.lucasgp.cait.tfg.competition.service.api.CompetitionStateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompetitionStateServiceImpl extends BaseServiceImpl<CompetitionState, String> implements CompetitionStateService {

    private final CompetitionStateDao competitionStateDao;

    @Autowired
    public CompetitionStateServiceImpl(CompetitionStateDao competitionStateDao) {
        super(competitionStateDao);
        this.competitionStateDao = competitionStateDao;
    }

}
