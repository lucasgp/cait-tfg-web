package es.lucasgp.cait.tfg.competition.dao.api.query;

import java.util.ArrayList;
import java.util.List;

public class Query {

    private final List<Condition> conditions = new ArrayList<>();

    public static Query getInstance() {
        return new Query();
    }

    private Query() {
    }

    public Query add(Condition condition) {
        conditions.add(condition);
        return this;
    }

    public Query add(String key, Object value, Operator op) {
        add(new Condition(key, value, op));
        return this;
    }

    public List<Condition> getConditions() {
        return new ArrayList<>(conditions);
    }

    public Query eq(String key, Object value) {
        return add(key, value, Operator.EQ);
    }

    public Query like(String key, Object value) {
        return add(key, value, Operator.LIKE);
    }

    public Query gt(String key, Object value) {
        return add(key, value, Operator.GT);
    }

    public Query gte(String key, Object value) {
        return add(key, value, Operator.GTE);
    }

    public Query lt(String key, Object value) {
        return add(key, value, Operator.LT);
    }

    public Query lte(String key, Object value) {
        return add(key, value, Operator.LTE);
    }
}
