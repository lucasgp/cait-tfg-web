package es.lucasgp.cait.tfg.competition.dao.impl;

import es.lucasgp.cait.tfg.competition.dao.api.CompetitionDao;
import es.lucasgp.cait.tfg.competition.model.Competition;
import org.springframework.stereotype.Repository;

@Repository
public class CompetitionDaoMongo extends BaseDaoMongo<Competition> implements CompetitionDao {

    public CompetitionDaoMongo() {
        super(Competition.class);
    }
}
