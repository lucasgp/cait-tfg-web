package es.lucasgp.cait.tfg.competition.security.user;

import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class CompetitionUserDetails extends User {

    private final es.lucasgp.cait.tfg.competition.model.User user;

    public CompetitionUserDetails(final es.lucasgp.cait.tfg.competition.model.User user, Collection<? extends GrantedAuthority> authorities) {
        super(user.getUsername(), user.getPassword(), authorities);
        this.user = user;
    }

    public String getId() {
        return user.getId();
    }

    public String getName() {
        return user.getName();
    }

    public es.lucasgp.cait.tfg.competition.model.User getUser() {
        return user;
    }

}
