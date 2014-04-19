package es.lucasgp.cait.tfg.competition.dao.impl;

import es.lucasgp.cait.tfg.competition.dao.api.TrackingDao;
import es.lucasgp.cait.tfg.competition.model.Tracking;
import es.lucasgp.cait.tfg.competition.model.geojson.Feature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
public class TrackingDaoMongo extends BaseDaoMongo<Tracking> implements TrackingDao {

    public TrackingDaoMongo() {
        super(Tracking.class);
    }

    @Autowired
    private MongoTemplate mongoOperations;

    @Override
    public void addFeature(String id, Feature feature) {
        mongoOperations.updateFirst(Query.query(Criteria.where("id").is(id)),
            new Update().push("geoJson.features", feature), this.getEntityClass());
    }
}
