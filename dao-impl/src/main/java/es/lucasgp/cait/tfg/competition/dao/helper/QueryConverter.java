package es.lucasgp.cait.tfg.competition.dao.helper;

import es.lucasgp.cait.tfg.competition.dao.api.query.Condition;
import es.lucasgp.cait.tfg.competition.dao.api.query.Query;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class QueryConverter {

    private static final Logger LOGGER = LoggerFactory.getLogger(QueryConverter.class);

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

    private Object getValue(String field, Object value, Type entityClass) {

        Object convertedValue = value;

        try {

            int childFieldSeparatorIndex = field.indexOf(".");

            if (childFieldSeparatorIndex != -1) {
                return getValue(field.substring(childFieldSeparatorIndex + 1), value, getType(field.substring(0, childFieldSeparatorIndex), entityClass));
            } else {

                Type returnType = getType(field, entityClass);

                if (returnType == Date.class && value instanceof String) {
                    LocalDate dateValue = DateTimeFormatter.ofPattern("yyyy-M-d").parse(String.class.cast(value), LocalDate::from);
                    convertedValue = Date.from(dateValue.atStartOfDay().toInstant(ZoneOffset.UTC));
                }
            }

        } catch (NoSuchMethodException ex) {
            LOGGER.error("Wrong method", ex);
        } catch (SecurityException ex) {
            LOGGER.error("Security violation", ex);
        }

        return convertedValue;
    }

    private Type getType(String field, Type type) throws SecurityException, NoSuchMethodException {

        Type returnType = null;

        if (type instanceof Class) {
            Method method = Class.class.cast(type).getMethod("get" + field.substring(0, 1).toUpperCase() + field.substring(1), (Class[]) null);
            returnType = method.getGenericReturnType();

            if (returnType instanceof ParameterizedType) {
                returnType = Class.class.cast(ParameterizedType.class.cast(returnType).getActualTypeArguments()[0]);
            }
        }

        return returnType;
    }
}
