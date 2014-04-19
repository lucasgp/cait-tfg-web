package es.lucasgp.cait.tfg.competition.service.api;

import es.lucasgp.cait.tfg.competition.model.Tracking;
import es.lucasgp.cait.tfg.competition.model.geojson.Feature;

public interface TrackingService extends BaseService<Tracking, String> {

    void addFeature(String id, Feature feature);

}
