package es.lucasgp.cait.tfg.model.tracking;

import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class CompetitionUserTracking {

    @Id
    private String id;

    private String competitionId;
    private String userId;

    private Tracking tracking;

}
