package es.lucasgp.cait.tfg.competition.model;

import java.util.Date;
import java.util.List;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.springframework.data.mongodb.core.index.Indexed;

public final class Competition extends BaseEntity {

    @Size(min = 1)
    @Indexed
    private String name;
    @Size(min = 1)
    private String description;

    @Size(min = 1)
    @Indexed
    private String ownerId;

    @Size(min = 1)
    @Indexed
    private String typeId;

    @Size(min = 1)
    @Indexed
    private String stateId;

    @NotNull
    @Indexed
    private Date startDate;

    @NotNull
    @Indexed
    private Date finishDate;

    private Route route;

    private List<Comment> comments;
    private List<Participant> participants;

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

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<Participant> getParticipants() {
        return participants;
    }

    public void setParticipants(List<Participant> participants) {
        this.participants = participants;
    }

}
