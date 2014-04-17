package es.lucasgp.cait.tfg.competition.model.geojson;

public class GeoJson {

    private String type = "FeatureCollection";

    private Feature[] features = new Feature[0];

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Feature[] getFeatures() {
        return features;
    }

    public void setFeatures(Feature[] features) {
        this.features = features;
    }

}
