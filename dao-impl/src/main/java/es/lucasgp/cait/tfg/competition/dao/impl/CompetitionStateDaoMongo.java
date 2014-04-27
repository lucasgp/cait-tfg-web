package es.lucasgp.cait.tfg.competition.dao.impl;

import es.lucasgp.cait.tfg.competition.dao.api.CompetitionStateDao;
import es.lucasgp.cait.tfg.competition.model.CompetitionState;
import org.springframework.stereotype.Repository;

@Repository
public class CompetitionStateDaoMongo extends BaseDaoMongo<CompetitionState> implements CompetitionStateDao {

    public CompetitionStateDaoMongo() {
        super(CompetitionState.class);
    }
}
