package es.lucasgp.cait.tfg.competition.model;

public final class RoleType extends BaseEntity {

    private String name;
    private String description;

    public String getName() {
        return this.name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

}
