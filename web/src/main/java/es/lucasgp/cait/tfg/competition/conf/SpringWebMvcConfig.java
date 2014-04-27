package es.lucasgp.cait.tfg.competition.conf;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.module.afterburner.AfterburnerModule;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.Ordered;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

@Configuration
@ComponentScan(basePackages = "es.lucasgp.cait.tfg.competition.controller")
@EnableWebMvc
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Import(SpringSecurityConfig.class)
public class SpringWebMvcConfig extends WebMvcConfigurerAdapter {

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        ObjectMapper mapper = converter.getObjectMapper();
        mapper.registerModule(new AfterburnerModule());
        converters.add(0, converter);
    }

    @Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setPrefix("/WEB-INF/pages/");
        viewResolver.setSuffix(".jsp");
        viewResolver.setViewClass(JstlView.class);
        return viewResolver;
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/web/login.html").setViewName("login");
        registry.addViewController("/web/main.html").setViewName("main");
        registry.addViewController("/web/templates/app.html").setViewName("templates/app");
        registry.addViewController("/web/templates/competitions/add.html").setViewName("templates/competitions/add");
        registry.addViewController("/web/templates/competitions/view.html").setViewName("templates/competitions/view");
        registry.addViewController("/web/templates/competitions/view_simple.html").setViewName("templates/competitions/view_simple");
        registry.addViewController("/web/templates/competitions/list.html").setViewName("templates/competitions/list");
        registry.addViewController("/web/templates/competitions/detail.html").setViewName("templates/competitions/detail");
        registry.addViewController("/web/templates/users/add.html").setViewName("templates/users/add");
        registry.addViewController("/web/templates/users/view.html").setViewName("templates/users/view");
        registry.addViewController("/web/templates/users/list.html").setViewName("templates/users/list");
        registry.addViewController("/web/templates/users/detail.html").setViewName("templates/users/detail");
        registry.addViewController("/web/templates/participants/view.html").setViewName("templates/participants/view");
        registry.addViewController("/web/templates/participants/list.html").setViewName("templates/participants/list");
        registry.addViewController("/web/templates/comments/view.html").setViewName("templates/comments/view");
        registry.addViewController("/web/templates/comments/list.html").setViewName("templates/comments/list");
        registry.addViewController("/web/templates/trackings/view.html").setViewName("templates/trackings/view");
        registry.addViewController("/web/templates/trackings/list.html").setViewName("templates/trackings/list");
        registry.addViewController("/web/templates/competition_types/combo.html").setViewName("templates/competition-types/combo");
        registry.addViewController("/web/templates/competition_states/combo.html").setViewName("templates/competition-states/combo");
        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
    }

}
