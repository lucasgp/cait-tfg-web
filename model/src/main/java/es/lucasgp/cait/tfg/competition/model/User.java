package es.lucasgp.cait.tfg.competition.model;

public class User extends BaseEntity {

    private String name;
    private String surname;

    public String getName() {
        return this.name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getSurname() {
        return this.surname;
    }

    public void setSurname(final String surname) {
        this.surname = surname;
    }

}
