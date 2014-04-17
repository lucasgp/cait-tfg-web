package es.lucasgp.cait.tfg.competition.model.geojson;

import java.util.Date;

public class Properties {

    private Date timestamp = new Date();
    private Integer order;

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

}
