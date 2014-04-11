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

    @Override
    public Tracking create(final Tracking tracking) {
        return super.create(tracking);
    }

    @Override
    public Tracking update(final Tracking tracking) {
        return super.update(tracking);
    }

    @Override
    public Tracking findById(final String id) {
        return super.findById(id);
    }

    @Override
    public List<Tracking> findAll() {
        return super.findAll();

    }

    @Override
    public PageResult<Tracking> findAll(PageRequest pageRequest) {
        return super.findAll(pageRequest);
    }

}
