package es.lucasgp.cait.tfg.competition.dao.api.query;

public class Condition {

    private String key;
    private Object value;
    private Operator operator;

    public Condition() {

    }

    public Condition(String key, Object value, Operator operator) {
        this.key = key;
        this.value = value;
        this.operator = operator;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    public Operator getOperator() {
        return operator;
    }

    public void setOperator(Operator operator) {
        this.operator = operator;
    }

}
