<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="taglibs.jsp" %>
<!doctype html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
        <script data-main="js/login" src="js/libs/require/require.js"></script>
    </head>
    <body>
        <form name="loginForm" action="${loginUrl}" method="post">
            <c:if test="${param.error != null}">
                <p>
                    <span id="login-error" data-i18n="login.error"></span>
                </p>
            </c:if>
            <c:if test="${param.logout != null}">
                <p>
                    <span id="login-logout" data-i18n="login.logout"></span>
                </p>
            </c:if>
            <p>
                <label id="username-label" for="username" data-i18n="login.form.username"></label>
                <input type="text" id="username" name="username"/>
            </p>
            <p>
                <label id="password-label" for="password" data-i18n="login.form.password"></label>
                <input type="password" id="password" name="password"/>
            </p>
            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
            <button id="submit-button" data-i18n="form.submit"></button>
        </form>
        <div><a id="goto-main" href="main.html" data-i18n="login.goto-main"></a></div>

    </body>
</html>
