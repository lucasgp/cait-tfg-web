package es.lucasgp.cait.tfg.competition.model;

import java.util.Collection;
import java.util.Date;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.springframework.data.mongodb.core.index.Indexed;

public class Competition extends BaseEntity {

    @Size(min = 1)
    @Indexed
    private String name;
    @Size(min = 1)
    private String description;

    /**
     * Usuario que creó la competición.
     */
    @Indexed
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
    @Indexed
    private Date startDate;
    @NotNull
    @Future
    @Indexed
    private Date finishDate;

    private Route route;

    private Collection<Comment> comments;
    private Collection<Participant> participants;

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

    public Collection<Comment> getComments() {
        return comments;
    }

    public void setComments(Collection<Comment> comments) {
        this.comments = comments;
    }

    public Collection<Participant> getParticipants() {
        return participants;
    }

    public void setParticipants(Collection<Participant> participants) {
        this.participants = participants;
    }

}
