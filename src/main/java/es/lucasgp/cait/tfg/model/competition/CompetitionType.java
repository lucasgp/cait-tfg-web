package es.lucasgp.cait.tfg.model.competition;

import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class CompetitionType {

    @Id
    private String id;
    @Indexed
    private String name;
    private String description;

}
