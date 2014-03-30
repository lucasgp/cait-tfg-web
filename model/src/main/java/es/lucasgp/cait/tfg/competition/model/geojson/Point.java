package es.lucasgp.cait.tfg.competition.model.geojson;

public class Point {

    private final String type = "Point";
    private double[] coordinates;

    public double[] getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(double[] coordinates) {
        this.coordinates = coordinates;
    }

}
