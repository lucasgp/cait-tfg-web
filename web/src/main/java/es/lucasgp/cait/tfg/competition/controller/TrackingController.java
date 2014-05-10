package es.lucasgp.cait.tfg.competition.controller;

import de.micromata.opengis.kml.v_2_2_0.Kml;
import es.lucasgp.cait.tfg.competition.dto.PageResult;
import es.lucasgp.cait.tfg.competition.model.Tracking;
import es.lucasgp.cait.tfg.competition.model.geojson.Feature;
import es.lucasgp.cait.tfg.competition.model.geojson.GeoJson;
import es.lucasgp.cait.tfg.competition.service.api.TrackingService;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.Size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.ServletServerHttpResponse;
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

    @RequestMapping(value = "/{id}/geojson", method = RequestMethod.GET)
    public ResponseEntity<GeoJson> findGeoJson(@PathVariable("id") @Size(min = 1) final String id) {
        Tracking tracking = super.findById(id);
        GeoJson geoJson = tracking != null ? tracking.getGeoJson() : null;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", "tracking.geojson");
        headers.setContentType(MediaType.APPLICATION_JSON);
        ResponseEntity<GeoJson> response = new ResponseEntity<>(geoJson, headers, geoJson != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
        return response;
    }

    @RequestMapping(value = "/{id}/kml", method = RequestMethod.GET)
    public void findKml(@PathVariable("id") @Size(min = 1) final String id, final HttpServletResponse response) {
        Tracking tracking = super.findById(id);
        GeoJson geoJson = tracking != null ? tracking.getGeoJson() : null;
        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
        response.setHeader("Content-Disposition", "attachment; filename=\"tracking.kml\"");
        try {
            this.getService().convertToKML(geoJson).marshal(response.getWriter());
        } catch (IOException ex) {
            ex.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/{id}/features", method = RequestMethod.POST)
    public void addFeature(@PathVariable("id") final String id, @RequestBody final Feature feature) {
        getService().addFeature(id, feature);
        Map<String, Object> headers = new HashMap<>();
        headers.put("trackingId", id);
        Message<Feature> message = new GenericMessage<>(feature, headers);
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
