package es.lucasgp.cait.tfg.competition.model;

import java.util.Date;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class Competition extends BaseEntity {

    @Size(min = 1)
    private String name;
    @Size(min = 1)
    private String description;
    /**
     * Carrera de montaña, maratón, 5k, 10k...
     */
    private String typeId;
    /**
     * Inscripción abierta, inscripción cerrada, en curso, terminada.
     */
    private String stateId;

    @NotNull
    @Future
    private Date startDate;
    @NotNull
    @Future
    private Date finishDate;

    private Route route;

    private Comment[] comments;
    private Participant[] participants;

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

    public String getTypeId() {
        return this.typeId;
    }

    public void setTypeId(final String typeId) {
        this.typeId = typeId;
    }

    public Date getStartDate() {
        return this.startDate;
    }

    public void setStartDate(final Date startDate) {
        this.startDate = startDate;
    }

    public Date getFinishDate() {
        return this.finishDate;
    }

    public void setFinishDate(final Date finishDate) {
        this.finishDate = finishDate;
    }

    public Route getRoute() {
        return this.route;
    }

    public void setRoute(final Route route) {
        this.route = route;
    }

    public Comment[] getComments() {
        return this.comments;
    }

    public void setComments(final Comment[] comments) {
        this.comments = comments;
    }

    public Participant[] getParticipants() {
        return this.participants;
    }

    public void setParticipants(final Participant[] participants) {
        this.participants = participants;
    }

}
