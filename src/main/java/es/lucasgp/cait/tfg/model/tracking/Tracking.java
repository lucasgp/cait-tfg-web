package es.lucasgp.cait.tfg.model.tracking;

import lombok.Data;

import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Tracking {

    private Track[] tracks;

}
