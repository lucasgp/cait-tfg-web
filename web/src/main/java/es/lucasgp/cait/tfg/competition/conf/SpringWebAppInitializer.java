package es.lucasgp.cait.tfg.competition.conf;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

public class SpringWebAppInitializer implements WebApplicationInitializer {

    @Override
    public void onStartup(final ServletContext servletContext) throws ServletException {

        final AnnotationConfigWebApplicationContext webCtx = new AnnotationConfigWebApplicationContext();
        webCtx.register(AppConfig.class);
        servletContext.addListener(new ContextLoaderListener(webCtx));

        final DispatcherServlet dispatcherServlet = new DispatcherServlet(webCtx);
        final ServletRegistration.Dynamic reg = servletContext.addServlet("rest-api", dispatcherServlet);
        reg.setLoadOnStartup(1);
        reg.addMapping("/resources/*");

    }

}
