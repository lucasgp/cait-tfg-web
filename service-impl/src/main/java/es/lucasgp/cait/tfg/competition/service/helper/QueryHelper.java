package es.lucasgp.cait.tfg.competition.service.helper;

import es.lucasgp.cait.tfg.competition.dao.api.query.Condition;
import es.lucasgp.cait.tfg.competition.dao.api.query.Operator;
import es.lucasgp.cait.tfg.competition.dao.api.query.Query;
import java.util.Map;

public class QueryHelper {

    public static final QueryHelper getInstance() {
        return new QueryHelper();
    }

    private QueryHelper() {
    }

    public Query toQuery(Map<String, String> params) {
        Query query = Query.getInstance();
        params.entrySet().forEach(entry -> query.add(getCondition(entry)));
        return query;

    }

    private Condition getCondition(Map.Entry<String, String> entry) {

        String keyParam = entry.getKey();
        Object value = entry.getValue();

        String[] keyComponents = keyParam.split("-");
        String key = keyComponents[0];
        Operator op = keyComponents.length > 1 ? getOperator(keyComponents[1]) : Operator.EQ;

        return new Condition(key, value, op);
    }

    private Operator getOperator(String operator) {
        return Operator.valueOf(operator.toUpperCase());
    }

}
