package es.lucasgp.cait.tfg.competition.controller;

import es.lucasgp.cait.tfg.competition.dto.PageResult;
import es.lucasgp.cait.tfg.competition.exceptions.NotOwnerException;
import es.lucasgp.cait.tfg.competition.exceptions.WrongIdException;
import es.lucasgp.cait.tfg.competition.model.Comment;
import es.lucasgp.cait.tfg.competition.model.Competition;
import es.lucasgp.cait.tfg.competition.model.Participant;
import es.lucasgp.cait.tfg.competition.security.user.CompetitionUserDetails;
import es.lucasgp.cait.tfg.competition.service.api.CompetitionService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.validation.Valid;
import javax.validation.constraints.Size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/competitions", produces = MediaType.APPLICATION_JSON_VALUE)
public class CompetitionController extends BaseController<Competition, String, CompetitionService> {

    private final SimpMessagingTemplate brokerMessagingTemplate;

    @Autowired
    public CompetitionController(CompetitionService competitionService, SimpMessagingTemplate brokerMessagingTemplate) {
        super(competitionService);
        this.brokerMessagingTemplate = brokerMessagingTemplate;
    }

    @PreAuthorize("isFullyAuthenticated()")
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public Competition create(@RequestBody @Valid final Competition competition) {
        competition.setOwnerId(CompetitionUserDetails.class.cast(SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());
        return super.create(competition);
    }

    @PreAuthorize("isFullyAuthenticated()")
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public Competition update(@PathVariable("id") @Size(min = 1) final String id, @RequestBody @Valid final Competition competition) {
        if (!id.equalsIgnoreCase(competition.getId())) {
            throw new WrongIdException();
        }
        validateOwner(id);
        Competition result = super.update(id, competition);

        Map<String, Object> headers = new HashMap<>();
        headers.put("competitionId", id);
        Message<String> message = new GenericMessage<>(competition.getStateId(), headers);
        this.brokerMessagingTemplate.convertAndSend("/topic/competition:state/" + id, message);

        return result;
    }

    @PreAuthorize("isFullyAuthenticated()")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @Override
    public void delete(@PathVariable("id") @Size(min = 1) final String id) {
        validateOwner(id);
        super.delete(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @Override
    public Competition findById(@PathVariable("id") @Size(min = 1) final String id) {
        return super.findById(id);
    }

    @RequestMapping(method = RequestMethod.GET)
    @Override
    public List<Competition> findAll(@RequestParam MultiValueMap parameters) {
        return super.findAll(parameters);

    }

    @RequestMapping(value = "/{page}/{size}", method = RequestMethod.GET)
    public PageResult<Competition> findAll(
        @PathVariable("page") Integer page,
        @PathVariable("size") Integer size,
        @RequestParam MultiValueMap parameters
    ) {
        return super.findAll(page, size, parameters);
    }

    @RequestMapping(value = "/{page}/{size}/{sortProperty}/{sortOrder}", method = RequestMethod.GET)
    public PageResult<Competition> findAll(
        @PathVariable("page") Integer page,
        @PathVariable("size") Integer size,
        @PathVariable("sortProperty") String sortProperty,
        @PathVariable("sortOrder") String sortOrder,
        @RequestParam MultiValueMap parameters
    ) {
        return super.findAll(page, size, sortProperty, sortOrder, parameters);
    }

    @PreAuthorize("isFullyAuthenticated()")
    @RequestMapping(value = "/{id}/participants", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Participant addParticipant(
        @PathVariable("id") @Size(min = 1) String competitionId) {
        Participant participant = new Participant();
        participant.setUserId(CompetitionUserDetails.class.cast(SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());
        getService().addParticipant(competitionId, participant);
        return participant;
    }

    @PreAuthorize("isFullyAuthenticated()")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/{id}/participants/{participantId}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateParticipant(
        @PathVariable("id") @Size(min = 1) String competitionId, @PathVariable("participantId") @Size(min = 1) String participantId, @RequestBody @Valid Participant participant) {
        if (!participantId.equalsIgnoreCase(participant.getUserId())) {
            throw new WrongIdException();
        }
        validateOwner(competitionId);
        getService().updateParticipant(competitionId, participant);
    }

    @PreAuthorize("isFullyAuthenticated() and (hasRole('ADMIN') or hasRole('MODERATOR'))")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/{id}/participants/{participantId}", method = RequestMethod.DELETE)
    public void deleteParticipant(@PathVariable("id") @Size(min = 1) String competitionId, @PathVariable("participantId") @Size(min = 1) String participantId) {
        getService().deleteParticipant(competitionId, participantId);
    }

    @PreAuthorize("isFullyAuthenticated()")
    @RequestMapping(value = "/{id}/comments", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Comment addComment(
        @PathVariable("id") @Size(min = 1) String competitionId, @RequestBody @Valid final Comment comment) {
        comment.setUserId(CompetitionUserDetails.class.cast(SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId());
        getService().addComment(competitionId, comment);
        return comment;
    }

    @PreAuthorize("isFullyAuthenticated() and (hasRole('ADMIN') or hasRole('MODERATOR'))")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/{id}/comments/{commentId}", method = RequestMethod.DELETE)
    public void deleteComment(@PathVariable("id") @Size(min = 1) String competitionId, @PathVariable("commentId") @Size(min = 1) String commentId) {
        getService().deleteComment(competitionId, commentId);
    }

    private void validateOwner(final String id) throws NotOwnerException {
        boolean isAdmin = false;
        isAdmin = SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
            .map((auth) -> auth.getAuthority().equalsIgnoreCase("ADMIN")).reduce(isAdmin, (accumulator, _item) -> accumulator || _item);
        String userId = CompetitionUserDetails.class.cast(SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        if (!isAdmin && !this.findById(id).getOwnerId().equalsIgnoreCase(userId)) {
            throw new NotOwnerException();
        }
    }
}
