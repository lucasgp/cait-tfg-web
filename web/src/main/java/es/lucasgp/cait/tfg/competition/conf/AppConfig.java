package es.lucasgp.cait.tfg.competition.conf;

import es.lucasgp.cait.tfg.competition.service.conf.ServicesSpringConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(ServicesSpringConfig.class)
public class AppConfig {

}
