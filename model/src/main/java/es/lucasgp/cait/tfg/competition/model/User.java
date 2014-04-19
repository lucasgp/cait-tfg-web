package es.lucasgp.cait.tfg.competition.model;

public class User extends BaseEntity {

    private String username;

    private String name;
    private String surname;

    private String email;

    private Integer phonePrefix;
    private Integer phoneNumber;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getPhonePrefix() {
        return phonePrefix;
    }

    public void setPhonePrefix(Integer phonePrefix) {
        this.phonePrefix = phonePrefix;
    }

    public Integer getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Integer phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

}
