<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="taglibs.jsp" %>
<!doctype html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>{{- $.t("app.title") }} &nbsp;{{- $.t("login.title") }}</title>
    </head>
    <body>
        <form name="loginForm" action="${loginUrl}" method="post">
            <c:if test="${param.error != null}">
                <p>
                    {{- $.t("login.error") }}:&nbsp;${param.error}
                </p>
            </c:if>
            <c:if test="${param.logout != null}">
                <p>
                    {{- $.t("login.logout") }}:&nbsp;${param.logout}
                </p>
            </c:if>
            <p>
                <label for="username">{{- $.t("login.form.username") }}</label>
                <input type="text" id="username" name="username"/>
            </p>
            <p>
                <label for="password">{{- $.t("login.form.password") }}</label>
                <input type="password" id="password" name="password"/>
            </p>
            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
            <input type="button" value="{{- $.t('login.form.submit') }}">
        </form>

    </body>
</html>
