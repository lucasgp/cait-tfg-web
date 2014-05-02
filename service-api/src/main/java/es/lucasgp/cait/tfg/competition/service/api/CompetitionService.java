package es.lucasgp.cait.tfg.competition.service.api;

import es.lucasgp.cait.tfg.competition.model.Comment;
import es.lucasgp.cait.tfg.competition.model.Competition;
import es.lucasgp.cait.tfg.competition.model.Participant;

public interface CompetitionService extends BaseService<Competition, String> {

    Competition addParticipant(final String id, final Participant participant);

    void updateParticipant(final String id, final Participant participant);

    void deleteParticipant(String competitionId, String participantId);

    Competition addComment(final String id, final Comment comment);

    void deleteComment(String competitionId, String commentId);

}
