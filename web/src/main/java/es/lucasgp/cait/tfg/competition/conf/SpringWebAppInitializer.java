package es.lucasgp.cait.tfg.competition.conf;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;
import org.springframework.web.WebApplicationInitializer;

import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class SpringWebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

//    @Override
//    public void onStartup(final ServletContext servletContext) throws ServletException {
//
//        final AnnotationConfigWebApplicationContext webCtx = new AnnotationConfigWebApplicationContext();
//        webCtx.register(AppConfig.class);
//        webCtx.register(SpringWebMvcConfig.class);
//        webCtx.register(SpringSecurityConfig.class);
//        servletContext.addListener(new ContextLoaderListener(webCtx));
//
//        final DispatcherServlet dispatcherServlet = new DispatcherServlet(webCtx);
//        final ServletRegistration.Dynamic reg = servletContext.addServlet("rest-api", dispatcherServlet);
//        reg.setLoadOnStartup(1);
//        reg.addMapping("/resources/*");
//
//    }
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[]{AppConfig.class, SpringSecurityConfig.class};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[]{SpringWebMvcConfig.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/resources/*"};
    }
}
