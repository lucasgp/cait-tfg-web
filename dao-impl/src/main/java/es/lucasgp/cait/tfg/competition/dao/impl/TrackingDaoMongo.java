package es.lucasgp.cait.tfg.competition.dao.impl;

import es.lucasgp.cait.tfg.competition.dao.api.TrackingDao;
import es.lucasgp.cait.tfg.competition.model.Tracking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class TrackingDaoMongo extends BaseDaoMongo<Tracking> implements TrackingDao {

    private static final String GEOJSON_POINT = "{ \"type\": \"Feature\", \"geometry\": {\"type\": \"Point\", \"coordinates\": [%s, %s]}, \"properties\": {\"timestamp\": \"%s\"}},";

    public TrackingDaoMongo() {
        super(Tracking.class);
    }

    // private static final DateFormat dateFormatter = new ISO8601DateFormat();
    @Autowired
    private MongoTemplate mongoOperations;

    // public void updateLocation(@Param("id") String id, @Param("latitude") double latitude,
    // @Param("longitude") double longitude, @Param("timestamp") Date timestamp) {
    // mongoOperations.updateFirst(
    // Query.query(Criteria.where("id").is(id)),
    // new Update().push("features",
    // String.format(GEOJSON_POINT, latitude, longitude, dateFormatter.format(timestamp))),
    // Tracking.class);
    //
    // }
}
