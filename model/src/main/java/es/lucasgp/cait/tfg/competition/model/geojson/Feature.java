package es.lucasgp.cait.tfg.competition.model.geojson;

public final class Feature {

    private String type = "Feature";
    private Point geometry;
    private Properties properties = new Properties();

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

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
