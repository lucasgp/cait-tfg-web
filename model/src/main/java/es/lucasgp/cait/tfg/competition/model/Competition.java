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
     * Usuario que creó la competición.
     */
    private String ownerId;
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
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public String getTypeId() {
        return typeId;
    }

    public void setTypeId(String typeId) {
        this.typeId = typeId;
    }

    public String getStateId() {
        return stateId;
    }

    public void setStateId(String stateId) {
        this.stateId = stateId;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(Date finishDate) {
        this.finishDate = finishDate;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public Comment[] getComments() {
        return comments;
    }

    public void setComments(Comment[] comments) {
        this.comments = comments;
    }

    public Participant[] getParticipants() {
        return participants;
    }

    public void setParticipants(Participant[] participants) {
        this.participants = participants;
    }

}
