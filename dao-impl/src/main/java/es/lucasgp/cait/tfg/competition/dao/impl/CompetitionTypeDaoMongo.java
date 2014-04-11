package es.lucasgp.cait.tfg.competition.dao.impl;

import es.lucasgp.cait.tfg.competition.dao.api.CompetitionTypeDao;
import es.lucasgp.cait.tfg.competition.model.CompetitionType;
import org.springframework.stereotype.Repository;

@Repository
public class CompetitionTypeDaoMongo extends BaseDaoMongo<CompetitionType> implements CompetitionTypeDao {

    public CompetitionTypeDaoMongo() {
        super(CompetitionType.class);
    }
}
