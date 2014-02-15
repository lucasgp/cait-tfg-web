package es.lucasgp.cait.tfg.model.competition;

import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Competition {

    @Id
    private String id;

    @Indexed
    private String name;
    private String description;
    private String startDate;
    private String finishDate;

    private String parentId;
    private String typeId;

    private CompetitionRoute route;
    private CompetitionTrackingConfiguration trackingConfiguration;

}
