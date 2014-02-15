package es.lucasgp.cait.tfg.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import es.lucasgp.cait.tfg.model.tracking.CompetitionUserTracking;

@RepositoryRestResource(exported = true)
public interface CompetitionUserTrackingRepository extends CrudRepository<CompetitionUserTracking, String> {

}
