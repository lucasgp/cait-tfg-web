package es.lucasgp.cait.tfg.competition.security.user;

import es.lucasgp.cait.tfg.competition.model.SecurityUser;
import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class CompetitionUserDetails extends User {

    private final SecurityUser user;

    public CompetitionUserDetails(final SecurityUser user, Collection<? extends GrantedAuthority> authorities) {
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
