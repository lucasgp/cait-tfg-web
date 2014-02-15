package es.lucasgp.cait.tfg.model.tracking;

import java.util.Date;

import lombok.Data;

import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Track {

    private double latitude;
    private double longitude;

    private Date date;

}
