package es.lucasgp.cait.tfg.competition.model;

import es.lucasgp.cait.tfg.competition.model.geojson.GeoJson;
import java.util.Date;
import javax.validation.constraints.Size;
import org.springframework.data.mongodb.core.index.Indexed;

public final class Tracking extends BaseEntity {

    @Size(min = 1)
    @Indexed
    private String userId;

    private Date startDate;

    private GeoJson geoJson;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public GeoJson getGeoJson() {
        return this.geoJson;
    }

    public void setGeoJson(final GeoJson geoJson) {
        this.geoJson = geoJson;
    }

}
