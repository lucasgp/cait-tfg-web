package es.lucasgp.cait.tfg.model.user;

import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class User {

    @Id
    private String id;
    private String name;
    private String surname;

    private UserRole[] roles;

}
