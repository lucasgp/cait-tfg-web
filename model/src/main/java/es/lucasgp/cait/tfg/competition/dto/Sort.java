package es.lucasgp.cait.tfg.competition.dto;

public final class Sort {

    public enum Order {

        ASC, DESC;
    }

    private String property;
    private Order order = Order.ASC;

    public Sort() {
    }

    public Sort(String property) {
        this.property = property;
    }

    public Sort(String property, Order order) {
        this.property = property;
        this.order = order;
    }

    public String getProperty() {
        return this.property;
    }

    public void setProperty(final String property) {
        this.property = property;
    }

    public Order getOrder() {
        return this.order;
    }

    public void setOrder(final Order order) {
        this.order = order;
    }

}
