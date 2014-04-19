package es.lucasgp.cait.tfg.competition.service.impl;

import es.lucasgp.cait.tfg.competition.dao.api.TrackingDao;
import es.lucasgp.cait.tfg.competition.model.Tracking;
import es.lucasgp.cait.tfg.competition.model.geojson.Feature;
import es.lucasgp.cait.tfg.competition.service.api.TrackingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TrackingServiceImpl extends BaseServiceImpl<Tracking, String> implements TrackingService {

    private final TrackingDao trackingDao;

    @Autowired
    public TrackingServiceImpl(TrackingDao trackingDao) {
        super(trackingDao);
        this.trackingDao = trackingDao;
    }

    @Override
    public void addFeature(String id, Feature feature) {
        this.trackingDao.addFeature(id, feature);
    }

}
