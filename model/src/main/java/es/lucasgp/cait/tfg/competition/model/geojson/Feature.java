package es.lucasgp.cait.tfg.competition.model.geojson;

public class Feature {

    private final String type = "Feature";
    private Point geometry;
    private Properties properties = new Properties();

    public Point getGeometry() {
        return geometry;
    }

    public void setGeometry(Point geometry) {
        this.geometry = geometry;
    }

    public Properties getProperties() {
        return properties;
    }

    public void setProperties(Properties properties) {
        this.properties = properties;
    }

}
