package es.lucasgp.cait.tfg.competition.service.impl;

import de.micromata.opengis.kml.v_2_2_0.Document;
import de.micromata.opengis.kml.v_2_2_0.Kml;
import de.micromata.opengis.kml.v_2_2_0.LineString;
import de.micromata.opengis.kml.v_2_2_0.MultiGeometry;
import de.micromata.opengis.kml.v_2_2_0.Placemark;
import es.lucasgp.cait.tfg.competition.dao.api.TrackingDao;
import es.lucasgp.cait.tfg.competition.model.Tracking;
import es.lucasgp.cait.tfg.competition.model.geojson.Feature;
import es.lucasgp.cait.tfg.competition.model.geojson.GeoJson;
import es.lucasgp.cait.tfg.competition.service.api.TrackingService;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
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

    @Override
    public Kml convertToKML(GeoJson geoJson) {

        final Kml kml = new Kml();
        Document document = kml.createAndSetDocument();
        Placemark linePlacemark = document.createAndAddPlacemark();
        LineString lineString = linePlacemark.createAndSetLineString();

        for (Feature feature : geoJson.getFeatures()) {

            lineString.addToCoordinates(feature.getGeometry().getCoordinates()[0], feature.getGeometry().getCoordinates()[1]);

            Placemark pointPlacemark = document.createAndAddPlacemark();
            pointPlacemark.createAndSetTimeStamp().withWhen(
                DateTimeFormatter.ISO_DATE_TIME.format(LocalDateTime.ofInstant(Instant.ofEpochMilli(feature.getProperties().getTimestamp().getTime()), ZoneId.systemDefault())));
            pointPlacemark.createAndSetPoint().addToCoordinates(feature.getGeometry().getCoordinates()[0], feature.getGeometry().getCoordinates()[1]);
        }
        return kml;
    }
}
