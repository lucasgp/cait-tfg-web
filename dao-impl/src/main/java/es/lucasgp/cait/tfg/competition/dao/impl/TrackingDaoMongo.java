package es.lucasgp.cait.tfg.competition.dao.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class TrackingDaoMongo {

    private static final String GEOJSON_POINT = "{ \"type\": \"Feature\", \"geometry\": {\"type\": \"Point\", \"coordinates\": [%s, %s]}, \"properties\": {\"timestamp\": \"%s\"}},";

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
