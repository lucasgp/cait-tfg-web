package es.lucasgp.cait.tfg.competition.service.impl;

import es.lucasgp.cait.tfg.competition.dao.api.CompetitionTypeDao;
import es.lucasgp.cait.tfg.competition.model.CompetitionType;
import es.lucasgp.cait.tfg.competition.service.api.CompetitionTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompetitionTypeServiceImpl extends BaseServiceImpl<CompetitionType, String> implements CompetitionTypeService {

    private final CompetitionTypeDao competitionTypeDao;

    @Autowired
    public CompetitionTypeServiceImpl(CompetitionTypeDao competitionTypeDao) {
        super(competitionTypeDao);
        this.competitionTypeDao = competitionTypeDao;
    }

}
