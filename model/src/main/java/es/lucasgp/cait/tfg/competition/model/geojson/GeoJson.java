package es.lucasgp.cait.tfg.competition.model.geojson;

import java.util.List;

public class GeoJson {

    private String type = "FeatureCollection";

    private List<Feature> features;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Feature> getFeatures() {
        return features;
    }

    public void setFeatures(List<Feature> features) {
        this.features = features;
    }

}
