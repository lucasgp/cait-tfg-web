package es.lucasgp.cait.tfg.competition.security.authentication;

import es.lucasgp.cait.tfg.competition.model.User;
import es.lucasgp.cait.tfg.competition.model.UserRole;
import es.lucasgp.cait.tfg.competition.security.user.CompetitionUserDetails;
import es.lucasgp.cait.tfg.competition.service.api.RoleTypeService;
import es.lucasgp.cait.tfg.competition.service.api.UserRoleService;
import es.lucasgp.cait.tfg.competition.service.api.UserService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CompetitionUserDetailsService implements UserDetailsService {

    private final UserService userService;
    private final UserRoleService userRoleService;
    private final RoleTypeService roleTypeService;

    @Autowired
    public CompetitionUserDetailsService(
        UserService userService,
        UserRoleService userRoleService,
        RoleTypeService roleTypeService) {
        this.userService = userService;
        this.userRoleService = userRoleService;
        this.roleTypeService = roleTypeService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        CompetitionUserDetails userDetails = null;

        List<User> users = this.userService.findByName(username);

        if (users.size() == 1) {
            User user = users.get(0);
            userDetails = new CompetitionUserDetails(user.getName(), user.getPassword(), getUserAuthorities(user));
        }

        return userDetails;
    }

    private List<GrantedAuthority> getUserAuthorities(User user) {
        return this.userRoleService.findByUserId(user.getId()).stream().map(userRole -> getGrantedAuthority(userRole)).collect(Collectors.toList());
    }

    private GrantedAuthority getGrantedAuthority(UserRole userRole) {
        return new SimpleGrantedAuthority(this.roleTypeService.findById(userRole.getRoleTypeId()).getName());
    }

}