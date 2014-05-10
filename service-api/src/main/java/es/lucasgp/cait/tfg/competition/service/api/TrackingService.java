package es.lucasgp.cait.tfg.competition.service.api;

import de.micromata.opengis.kml.v_2_2_0.Kml;
import es.lucasgp.cait.tfg.competition.model.Tracking;
import es.lucasgp.cait.tfg.competition.model.geojson.Feature;
import es.lucasgp.cait.tfg.competition.model.geojson.GeoJson;

public interface TrackingService extends BaseService<Tracking, String> {

    void addFeature(String id, Feature feature);

    Kml convertToKML(GeoJson geoJson);

}
