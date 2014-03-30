package es.lucasgp.cait.tfg.competition.dao.conf;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@ComponentScan({ "es.lucasgp.cait.tfg.competition.dao.impl", "es.lucasgp.cait.tfg.competition.dao.helper" })
@Import(SpringDataMongoConfig.class)
public class DaoConfig {

}
