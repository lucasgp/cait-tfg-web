package es.lucasgp.cait.tfg.competition.dao.helper;

import es.lucasgp.cait.tfg.competition.dao.api.query.Condition;
import es.lucasgp.cait.tfg.competition.dao.api.query.Query;
import java.lang.reflect.Method;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

public class QueryConverter {

    private final Class<?> entityClass;

    public static final QueryConverter getInstance(Class<?> entityClass) {
        return new QueryConverter(entityClass);
    }

    private QueryConverter(Class<?> entityClass) {
        this.entityClass = entityClass;
    }

    public org.springframework.data.mongodb.core.query.Query toMongoQuery(final Query query) {

        org.springframework.data.mongodb.core.query.Query mongoQuery = new org.springframework.data.mongodb.core.query.Query();

        Map<String, Collection<Condition>> map = new HashMap<>();

        query.getConditions().stream().forEach((condition) -> {
            Collection<Condition> keyConditions = map.get(condition.getKey());
            if (keyConditions == null) {
                keyConditions = new ArrayList<>();
                map.put(condition.getKey(), keyConditions);
            }
            keyConditions.add(condition);
        });

        map.entrySet().forEach(entry -> mongoQuery.addCriteria(toMongoCriteria(entry.getKey(), entry.getValue())));

        return mongoQuery;
    }

    public org.springframework.data.mongodb.core.query.Criteria toMongoCriteria(String field, final Collection<Condition> conditions) {

        org.springframework.data.mongodb.core.query.Criteria criteria = org.springframework.data.mongodb.core.query.Criteria.where(field);

        conditions.forEach(condition -> {
            Object value = getValue(field, condition.getValue(), this.entityClass);
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
        });

        return criteria;
    }

    private Object getValue(String field, Object value, Class<?> entityClass) {
        Object convertedValue = value;

        try {
            Method method = this.entityClass.getDeclaredMethod("get" + field.substring(0, 1).toUpperCase() + field.substring(1), (Class[]) null);
            Class<?> returnType = method.getReturnType();

            if (returnType == Date.class && value instanceof String) {
                LocalDate dateValue = DateTimeFormatter.ofPattern("yyyy-MM-dd").parse(String.class.cast(value), LocalDate::from);
                convertedValue = Date.from(dateValue.atStartOfDay().toInstant(ZoneOffset.UTC));
            }

        } catch (NoSuchMethodException ex) {
            // TODO
            ex.printStackTrace();
        } catch (SecurityException ex) {
            // TODO
            ex.printStackTrace();
        }

        return convertedValue;
    }
}
