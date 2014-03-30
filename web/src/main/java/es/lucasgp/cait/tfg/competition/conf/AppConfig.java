package es.lucasgp.cait.tfg.competition.conf;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@ComponentScan(basePackages = "es.lucasgp.cait.tfg.competition")
@EnableWebMvc
public class AppConfig {

}
