package es.lucasgp.cait.tfg.competition.dao.helper;

import es.lucasgp.cait.tfg.competition.dao.api.query.Condition;
import es.lucasgp.cait.tfg.competition.dao.api.query.Query;
import java.util.regex.Pattern;

public final class QueryConverter {

    private QueryConverter() {
    }

    public static org.springframework.data.mongodb.core.query.Query toMongoQuery(final Query query) {

        org.springframework.data.mongodb.core.query.Query mongoQuery = new org.springframework.data.mongodb.core.query.Query();

        query.getConditions().forEach(condition -> mongoQuery.addCriteria(toMongoCriteria(condition)));

        return mongoQuery;
    }

    public static org.springframework.data.mongodb.core.query.Criteria toMongoCriteria(final Condition condition) {

        org.springframework.data.mongodb.core.query.Criteria criteria = org.springframework.data.mongodb.core.query.Criteria.where(condition.getKey());

        Object value = condition.getValue();

        switch (condition.getOperator()) {

            case EQ:
                criteria.is(value);
                break;
            case GT:
                criteria.gt(value);
                break;
            case GTE:
                criteria.gte(value);
                break;
            case LT:
                criteria.lt(value);
                break;
            case LTE:
                criteria.lte(value);
                break;
            case LIKE:

                if (!(value instanceof String)) {
                    throw new IllegalArgumentException();
                }

                String stringValue = (String) value;
                criteria.regex(Pattern.compile(stringValue, Pattern.DOTALL | Pattern.CASE_INSENSITIVE));

                break;
            default:
                throw new AssertionError(condition.getOperator().name());
        }

        return criteria;
    }
}
