package es.lucasgp.cait.tfg.competition.model.geojson;

public class GeoJson {

    private final String type = "FeatureCollection";

    private Feature[] features = new Feature[0];

    public Feature[] getFeatures() {
        return features;
    }

    public void setFeatures(Feature[] features) {
        this.features = features;
    }

}
