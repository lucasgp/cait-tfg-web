<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ include file="taglibs.jsp" %>
<!doctype html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
        <link rel="stylesheet" href="css/base.css" media="(min-width: 1024px)">
        <link rel="stylesheet" href="css/base_mobile.css" media="(max-width: 1024px)">
        <script data-main="js/login" src="js/libs/require/require.js"></script>
    </head>
    <body>
        <section id="app">
            <header id="header">
                <h1 id="header-title" data-i18n="app.title"></h1>
            </header>
            <div id="loginForm">
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
                        <input type="text" id="username" name="username" autofocus="true"/>
                    </p>
                    <p>
                        <label id="password-label" for="password" data-i18n="login.form.password"></label>
                        <input type="password" id="password" name="password"/>
                    </p>
                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                    <button id="submit-button" data-i18n="form.submit"></button>
                </form>
                <div><a id="goto-main" href="main.html" data-i18n="login.goto-main"></a></div>
            </div>
            <footer id="footer">
                <p id="footer-content" data-i18n="app.footer"></p>
            </footer>
        </section>
    </body>
</html>
