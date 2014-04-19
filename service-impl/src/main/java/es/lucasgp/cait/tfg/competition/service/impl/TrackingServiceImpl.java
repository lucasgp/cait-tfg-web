package es.lucasgp.cait.tfg.competition.service.impl;

import es.lucasgp.cait.tfg.competition.dao.api.TrackingDao;
import es.lucasgp.cait.tfg.competition.dto.PageRequest;
import es.lucasgp.cait.tfg.competition.dto.PageResult;
import es.lucasgp.cait.tfg.competition.model.Tracking;
import es.lucasgp.cait.tfg.competition.service.api.TrackingService;
import java.util.List;
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

}
