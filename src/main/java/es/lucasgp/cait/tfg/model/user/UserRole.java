package es.lucasgp.cait.tfg.model.user;

import lombok.Data;

import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class UserRole {

    private User user;
    private UserRoleType roleType;

}
