package es.lucasgp.cait.tfg.competition.controller;

import es.lucasgp.cait.tfg.competition.dto.PageResult;
import es.lucasgp.cait.tfg.competition.model.Tracking;
import es.lucasgp.cait.tfg.competition.model.geojson.Feature;
import es.lucasgp.cait.tfg.competition.service.api.TrackingService;
import javax.validation.constraints.Size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/trackings", produces = MediaType.APPLICATION_JSON_VALUE)
public class TrackingController extends BaseController<Tracking, String, TrackingService> {

    private final SimpMessagingTemplate brokerMessagingTemplate;

    @Autowired
    public TrackingController(TrackingService trackingService, SimpMessagingTemplate brokerMessagingTemplate) {
        super(trackingService);
        this.brokerMessagingTemplate = brokerMessagingTemplate;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @Override
    public Tracking findById(@PathVariable("id") @Size(min = 1) final String id) {
        return super.findById(id);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/{id}/features", method = RequestMethod.POST)
    public void addFeature(@PathVariable("id") final String id, @RequestBody final Feature feature) {
        getService().addFeature(id, feature);
        Message<Feature> message = new GenericMessage<>(feature);
        this.brokerMessagingTemplate.convertAndSend("/topic/tracking:participant/" + id, message);
    }

    @RequestMapping(value = "/{page}/{size}/{sortProperty}/{sortOrder}", method = RequestMethod.GET)
    public PageResult<Tracking> findAll(
        @PathVariable("page") Integer page,
        @PathVariable("size") Integer size,
        @PathVariable("sortProperty") String sortProperty,
        @PathVariable("sortOrder") String sortOrder,
        @RequestParam MultiValueMap parameters
    ) {
        return super.findAll(page, size, sortProperty, sortOrder, parameters);
    }
}
