package es.lucasgp.cait.tfg.competition.model;

import es.lucasgp.cait.tfg.competition.model.geojson.GeoJson;

public class Tracking extends BaseEntity {

    private GeoJson geoJson;

    public GeoJson getGeoJson() {
        return this.geoJson;
    }

    public void setGeoJson(final GeoJson geoJson) {
        this.geoJson = geoJson;
    }

}
