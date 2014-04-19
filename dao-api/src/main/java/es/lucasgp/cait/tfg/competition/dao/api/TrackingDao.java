package es.lucasgp.cait.tfg.competition.dao.api;

import es.lucasgp.cait.tfg.competition.model.Tracking;
import es.lucasgp.cait.tfg.competition.model.geojson.Feature;

public interface TrackingDao extends BaseDao<Tracking, String> {

    void addFeature(String id, Feature feature);

}
