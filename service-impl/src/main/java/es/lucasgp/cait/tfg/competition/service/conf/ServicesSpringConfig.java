package es.lucasgp.cait.tfg.competition.service.conf;

import es.lucasgp.cait.tfg.competition.dao.conf.DaosSpringConfig;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

@ComponentScan(basePackages = "es.lucasgp.cait.tfg.competition.service.impl")
@Import(DaosSpringConfig.class)
public class ServicesSpringConfig {

}
