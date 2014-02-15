package es.lucasgp.cait.tfg.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import es.lucasgp.cait.tfg.model.competition.Competition;

@RepositoryRestResource(exported = true)
public interface CompetitionRepository extends CrudRepository<Competition, String> {

}
