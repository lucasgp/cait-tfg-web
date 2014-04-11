package es.lucasgp.cait.tfg.competition.security.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class CompetitionAuthenticationProvider implements AuthenticationProvider {

    private final CompetitionUserDetailsService competitionUserDetailsService;

    @Autowired
    public CompetitionAuthenticationProvider(CompetitionUserDetailsService competitionUserDetailsService) {
        this.competitionUserDetailsService = competitionUserDetailsService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        UsernamePasswordAuthenticationToken token = null;

        UserDetails user = competitionUserDetailsService.loadUserByUsername(authentication.getName());

        //TODO comprobar password de una manera decente
        if (user != null && user.getPassword().equals(authentication.getCredentials().toString())) {
            token = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword(), user.getAuthorities());
        }

        return token;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }

}
