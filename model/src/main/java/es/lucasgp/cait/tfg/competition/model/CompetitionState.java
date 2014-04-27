package es.lucasgp.cait.tfg.competition.model;

import javax.validation.constraints.Size;
import org.springframework.data.mongodb.core.index.Indexed;

public final class CompetitionState extends BaseEntity {

    @Size(min = 1)
    @Indexed
    private String name;
    private String description;

    public String getName() {
        return this.name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

}
