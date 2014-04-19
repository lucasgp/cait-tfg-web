package es.lucasgp.cait.tfg.competition.controller;

import es.lucasgp.cait.tfg.competition.model.Tracking;
import es.lucasgp.cait.tfg.competition.model.geojson.Feature;
import es.lucasgp.cait.tfg.competition.service.api.TrackingService;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.Size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/trackings", produces = MediaType.APPLICATION_JSON_VALUE)
public class TrackingController extends BaseController<Tracking, String, TrackingService> {

    @Autowired
    public TrackingController(TrackingService trackingService) {
        super(trackingService);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public Tracking create(@RequestBody @Valid final Tracking tracking) {
        return super.create(tracking);
    }

    @PreAuthorize("#tracking.name == principal.trackingname or hasRole('ROLE_ADMIN')")
    @RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public Tracking update(@RequestBody @Valid final Tracking tracking) {
        return super.update(tracking);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @Override
    public Tracking findById(@PathVariable("id") @Size(min = 1) final String id) {
        return super.findById(id);
    }

    @RequestMapping(method = RequestMethod.GET)
    @Override
    public List<Tracking> findAll() {
        return super.findAll();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(value = "/{id}/features", method = RequestMethod.POST)
    public void addFeature(@PathVariable("id") final String id, @RequestBody final Feature feature) {
        getService().addFeature(id, feature);
    }
}
