package es.lucasgp.cait.tfg.competition.service.impl;

import de.micromata.opengis.kml.v_2_2_0.Document;
import de.micromata.opengis.kml.v_2_2_0.Kml;
import de.micromata.opengis.kml.v_2_2_0.Placemark;
import es.lucasgp.cait.tfg.competition.model.Comment;
import es.lucasgp.cait.tfg.competition.model.Competition;
import es.lucasgp.cait.tfg.competition.model.Participant;
import es.lucasgp.cait.tfg.competition.model.RoleType;
import es.lucasgp.cait.tfg.competition.model.SecurityUser;
import es.lucasgp.cait.tfg.competition.model.Tracking;
import es.lucasgp.cait.tfg.competition.model.User;
import es.lucasgp.cait.tfg.competition.model.UserRole;
import es.lucasgp.cait.tfg.competition.model.geojson.Feature;
import es.lucasgp.cait.tfg.competition.model.geojson.GeoJson;
import es.lucasgp.cait.tfg.competition.model.geojson.Point;
import es.lucasgp.cait.tfg.competition.service.api.CompetitionService;
import es.lucasgp.cait.tfg.competition.service.api.RoleTypeService;
import es.lucasgp.cait.tfg.competition.service.api.TrackingService;
import es.lucasgp.cait.tfg.competition.service.api.UserRoleService;
import es.lucasgp.cait.tfg.competition.service.api.UserService;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.springframework.context.ApplicationContext;

public class TrackingServiceImplTest extends BaseMongoDbSpringTest {

    private static final ApplicationContext CONTEXT = getContext();

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    private TrackingService service;

    public TrackingServiceImplTest() {
    }

    @Before
    public void setUp() {
        service = CONTEXT.getBean(TrackingServiceImpl.class);
    }

    @Test
    public void testAddFeature() {

        Tracking entity = new Tracking();
        entity = service.create(entity);

        Feature feature = new Feature();

        service.addFeature(entity.getId(), feature);

        Tracking trackWithFeature = service.findById(entity.getId());

        assertNotNull(trackWithFeature.getGeoJson());
        assertNotNull(trackWithFeature.getGeoJson().getFeatures());
        assertEquals(1, trackWithFeature.getGeoJson().getFeatures().size());

    }

    @Test
    public void testConvertToKml() {

        GeoJson geoJson = new GeoJson();
        geoJson.setFeatures(new ArrayList());
        Feature feature = new Feature();
        geoJson.getFeatures().add(feature);
        Point point = new Point();
        feature.setGeometry(point);
        point.setCoordinates(new double[]{1d, 2d});

        Kml kml = service.convertToKML(geoJson);

        assertNotNull(kml);
        assertNotNull(kml.getFeature());
        assertTrue(kml.getFeature() instanceof Document);
        assertNotNull(((Document) kml.getFeature()).getFeature());
        assertEquals(2, ((Document) kml.getFeature()).getFeature().size());
        for (de.micromata.opengis.kml.v_2_2_0.Feature placemark : ((Document) kml.getFeature()).getFeature()) {
            assertTrue(placemark instanceof Placemark);
        }

    }

}
