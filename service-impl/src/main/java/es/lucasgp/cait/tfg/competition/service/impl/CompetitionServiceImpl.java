package es.lucasgp.cait.tfg.competition.service.impl;

import es.lucasgp.cait.tfg.competition.dao.api.CompetitionDao;
import es.lucasgp.cait.tfg.competition.model.Comment;
import es.lucasgp.cait.tfg.competition.model.Competition;
import es.lucasgp.cait.tfg.competition.model.Participant;
import es.lucasgp.cait.tfg.competition.model.Tracking;
import es.lucasgp.cait.tfg.competition.service.api.CompetitionService;
import es.lucasgp.cait.tfg.competition.service.api.TrackingService;
import es.lucasgp.cait.tfg.competition.service.api.UserService;
import java.util.ArrayList;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompetitionServiceImpl extends BaseServiceImpl<Competition, String> implements CompetitionService {

    private final CompetitionDao competitionDao;

    private final TrackingService trackingService;

    private final UserService userService;

    @Autowired
    public CompetitionServiceImpl(CompetitionDao competitionDao, TrackingService trackingService, UserService userService) {
        super(competitionDao);
        this.competitionDao = competitionDao;
        this.trackingService = trackingService;
        this.userService = userService;
    }

    @Override
    public Competition addParticipant(final String id, final Participant participant) {

        if (this.userService.findById(participant.getUserId()) == null) {
            // TODO lanzar una excepcion tipada
            throw new IllegalArgumentException();
        }

        Tracking tracking = new Tracking();
        tracking.setUserId(participant.getUserId());
        participant.setTrackingId(this.trackingService.create(tracking).getId());

        Competition comp = findById(id);

        if (comp.getParticipants() != null) {
            /*
             * Is the participant already in the competition? If so, don't
             * update.
             */
            if (comp.getParticipants().stream().anyMatch(p -> p.getUserId().equalsIgnoreCase(participant.getUserId()))) {
                return comp;
            }

        } else {
            comp.setParticipants(new ArrayList<>());
        }

        comp.getParticipants().add(participant);

        return this.update(comp);
    }

    @Override
    public void updateParticipant(String id, Participant participant) {

        Competition comp = findById(id);

        if (comp.getParticipants() != null) {
            comp.getParticipants().forEach(p -> {
                if (p.getTrackingId().equalsIgnoreCase(participant.getTrackingId()) && p.getUserId().equalsIgnoreCase(participant.getUserId())) {
                    p.setScore(participant.getScore());
                }
            });

            this.update(comp);
        }
    }

    @Override
    public void deleteParticipant(String id, String participantId) {

        Competition comp = findById(id);

        if (comp.getParticipants() != null) {
            comp.getParticipants().removeIf(p -> p.getUserId() != null && p.getUserId().equalsIgnoreCase(participantId));
            this.update(comp);
        }
    }

    @Override
    public Competition addComment(final String id, final Comment comment) {

        if (this.userService.findById(comment.getUserId()) == null) {
            // TODO lanzar una excepcion tipada
            throw new IllegalArgumentException();
        }

        Competition comp = findById(id);

        if (comp.getComments() == null) {
            comp.setComments(new ArrayList<>());
        }

        comment.setId(Integer.toString(comp.getComments().size() + 1));
        comment.setCommentDate(new Date());

        comp.getComments().add(comment);

        return this.update(comp);
    }

    @Override
    public void deleteComment(String id, String commentId) {

        Competition comp = findById(id);

        if (comp.getComments() != null) {
            comp.getComments().removeIf(c -> c.getId() != null && c.getId().equalsIgnoreCase(commentId));
            this.update(comp);
        }
    }
}
